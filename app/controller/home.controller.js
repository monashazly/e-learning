const otpGenerator = require('generate-serial-key')
const studentModel = require('../../models/student.model')
const teacherModel = require('../../models/teacher.model')
const resData = require('../helper/resData')
const sendEmail = require('../helper/sendEmail')

const register = async (req, res, table) => {
    try {
        let { name, email, password } = req.body
        let data = { name, email, password }
        let user = new table(data)
        user.process.activationOTP = otpGenerator.generate(12, "")
        await user.save()
        sendEmail(user.email, 'Activation Email', `<h2 style='color:blue'>Email Activation</h2>

        Click on this link to active your user

        <a href="http://localhost:3000/activation/${user._id}/${user.process.activationOTP}">Click here</a>
        `)
        resData(res, 200, true, user, 'data inserted successfully')
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

class Home {
    static postRegister = (req, res) => {
        if (req.body.userType == 'student') {
            register(req, res, studentModel)
        } else if (req.body.userType == 'teacher') {
            register(req, res, teacherModel)
        }
    }

    static postLogin = (req, res) => {
        if (req.body.userType == 'student') {
            login(req, res, studentModel)
        } else if (req.body.userType == 'teacher') {
            login(req, res, teacherModel)
        }
    }

    static getActivationOTP = async (req, res) => {
        if (req.params.id.startsWith('T')) {
            activationOTP(req, res, teacherModel)
        } else if (req.params.id.startsWith('S')) {
            activationOTP(req, res, studentModel)
        }
    }

    static postResetPassword = async (req, res) => {
        if (req.body.userType == 'student') {
            let email = req.body.email
            let user = await studentModel.findOne({ email })
            if (!user) return resData(res, 200, true, '', 'this email does not found')
            if (user.process.resetPasswordTime > Date.now()) return resData(req, 200, true, '', 'the link already send, try again later')
            user.process.resetPasswordOTP = otpGenerator.generate(12, "")
            user.process.resetPasswordTime = Date.now() + (15 * 60 * 1000)

        }
        else if (req.body.userType == 'teacher') ''
    }
}

module.exports = Home






/*
Date.now() => to end    => 100 + 30 ms
Date.now() => for Check => 120 ms

if(check > end) false
if(end < check) true

        past        present         future
         50           100             150

        15 min => 90000 MS


*/





















