const bcryptjs = require('bcryptjs/dist/bcrypt')
const otpGenerator = require('generate-serial-key')
const studentModel = require('../../models/student.model')
const teacherModel = require('../../models/teacher.model')
const resData = require('../helper/resData')
const sendEmail = require('../helper/sendEmail')
const mailContent = require('../helper/mailContent')

const register = async (req, res, table) => {
    try {
        let { name, email, password } = req.body
        let data = { name, email, password }
        let user = new table(data)
        user.process.activationOTP = otpGenerator.generate(12, "")
        await user.save()
        sendEmail(user.email, 'Activation Email', mailContent(user, 'activation'))
        resData(res, 200, true, '', 'data inserted successfully')
    } catch (e) {
        resData(res, 500, false, e.message, 'error in insertion')
    }
}
const login = async (req, res, table) => {
    try {
        let user = await table.login(req.body.email, req.body.password)
        let token = await user.GenerateToken()
        user.tokens.push({ token })
        await user.save()
        resData(res, 200, true, token, 'logged in successfully')
    } catch (e) {
        resData(res, 500, false, e.message, 'Error')
    }
}
const activationOTP = async (req, res, table) => {
    try {
        let _id = req.params.id;
        let activationOTP = req.params.activationOTP
        let user = await table.findOneAndUpdate({ _id, 'process.activationOTP': activationOTP }, { 'process.activationOTPStatus': true, 'process.activationOTP': "" })
        if (!user) return resData(res, 200, true, user, 'this link is not valid')
        if (user.process.activationOTPStatus === true) return resData(res, 200, true, user, 'this user is already activated')
        resData(res, 200, true, '', 'this user is activated Successfuly')
    } catch (e) {
        resData(res, 500, false, e.message, 'error in active user try again')
    }
}
const ResetPassword = async (req, res, table) => {
    try {
        let email = req.body.email
        let user = await table.findOne({ email })
        if (!user) return resData(res, 200, true, '', 'this email does not found')
        if (user.process.resetPasswordTime > Date.now()) return resData(req, 200, true, '', 'the link already sent before, try again later')
        user.process.resetPasswordOTP = otpGenerator.generate(12, "")
        user.process.resetPasswordTime = Date.now() + (15 * 60 * 1000)
        await user.save()
        let link = `http://localhost:3000/resetPassword/${user._id}/${user.process.resetPasswordOTP}`
        sendEmail(user.email, 'Reset Password', mailContent(user, 'resetPassword'))
        resData(res, 200, true, `${link}`, 'Link has been Send Successfuly to Email')
    } catch (e) {
        resData(res, 500, false, e.message, 'Error in handling process try again later')
    }
}
const ResetPasswordForm = async (req, res, table) => {
    try {
        let _id = req.params.id
        let resetPasswordOTP = req.params.resetPasswordOTP
        let password = req.body.password
        let user = await table.findOne({ _id, 'process.resetPasswordOTP': resetPasswordOTP })
        if (!user) return resData(res, 200, true, '', 'this link is not valid')
        if (user.process.resetPasswordTime < Date.now()) resData(res, 200, true, '', 'this link expired')
        let hashPassword = await bcryptjs.hash(password, +process.env.PASSWORDHASH)
        user.password = hashPassword;
        await user.save()
        resData(res, 200, true, '', 'password Chenged Successfuly')
    } catch (e) {
        resData(res, 500, false, e.message, 'Error in handling process try again later')
    }
}


class Home {
    static postRegister = (req, res) => {
        if (req.body.userType == 'student') register(req, res, studentModel)
        else if (req.body.userType == 'teacher') register(req, res, teacherModel)
    }

    static postLogin = (req, res) => {
        if (req.body.userType == 'student') login(req, res, studentModel)
        else if (req.body.userType == 'teacher') login(req, res, teacherModel)
    }

    static getActivationOTP = async (req, res) => {
        if (req.params.id.startsWith('T')) activationOTP(req, res, teacherModel)
        else if (req.params.id.startsWith('S')) activationOTP(req, res, studentModel)
    }

    static postResetPassword = async (req, res) => {
        if (req.params.id.startsWith('T')) ResetPassword(req, res, teacherModel)
        else if (req.params.id.startsWith('S')) ResetPassword(req, res, studentModel)
    }

    static postResetPasswordForm = async (req, res) => {
        if (req.params.id.startsWith('T')) ResetPasswordForm(req, res, teacherModel)
        else if (req.params.id.startsWith('S')) ResetPasswordForm(req, res, studentModel)
    }

    static getLogout = async (req, res) => {
        let user = req.user
        let token = req.token
        if (token.startsWith('A')) {
            console.log('A')
            try {
                user.token = ""
                await user.save()
                resData(res, 200, true, '', 'user logged out Successfuly')
            } catch (e) {
                resData(res, 500, false, e.message, 'faild in log out')
            }
        } else {
            try {
                user.tokens = user.tokens.filter(tok => tok.token != token)
                await user.save()
                resData(res, 200, true, '', 'user logged out Successfuly')
            } catch (e) {
                resData(res, 500, false, e.message, 'faild in log out')
            }
        }
    }
}



module.exports = Home