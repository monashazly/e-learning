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
        user.activationOTP = otpGenerator.generate(12, "")
        await user.save()
        sendEmail(user.email, 'Activation Email', `<h2 style='color:blue'>Email Activation</h2>

        Click on this link to active your user

        http://localhost:3000/activation/${user._id}/${user.activationOTP}
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
        resData(res, 200, true, user, 'logged in successfully')
    } catch (e) {
        resData(res, 500, false, e.message, 'Error')
    }
}
const activationOTP = async (req, res, table) => {
    try {
        let _id = req.params.id;
        let activationOTP = req.params.activationOTP
        let user = await table.findOneAndUpdate({ _id, activationOTP }, { activationOTPStatus: true, activationOTP: "" })
        if (!user) return resData(res, 200, true, user, 'this link is not valid')
        if (user.activationOTPStatus === true) return resData(res, 200, true, user, 'this user is already activated')
        resData(res, 200, true, user, 'this user is activated Successfuly')
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
}

module.exports = Home