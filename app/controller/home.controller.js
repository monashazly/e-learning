const studentModel = require('../../models/student.model')
const teacherModel = require('../../models/teacher.model')
const resData = require('../helper/resData')

class Home {
    static postRegister = async (req, res) => {
        if (req.body.userType == 'student') {
            try {
                let student = new studentModel(req.body)
                await student.save()
                resData(res, 200, true, student, 'data inserted successfully')
            } catch (e) {
                resData(res, 500, false, e.message, 'error in insertion')
            }
        } else if (req.body.userType == 'teacher') {
            try {
                let teacher = new teacherModel(req.body)
                await teacher.save()
                resData(res, 200, true, teacher, 'data inserted successfully')
            }
            catch (e) {
                resData(res, 500, false, e.message, 'error in insertion')
            }
        }
    }

    static postLogin = async (req, res) => {
        if (req.body.userType == 'student') {
            try {
                let student = await studentModel.login(req.body.email, req.body.password)
                let token = await student.GenerateToken()

                student.tokens.push({ token })
                await student.save()
                resData(res, 200, true, student, 'logged in successfully')
            } catch (e) {
                resData(res, 500, false, e.message, 'Error')
            }

        } else if (req.body.userType == 'teacher') {

            try {
                let teacher = await teacherModel.login(req.body.email, req.body.password)
                let token = await teacher.generateToken()
                teacher.tokens.push(token)
                await teacher.save()
                resData(res, 200, true, teacher, 'logged in successfully')
            } catch (e) {
                resData(res, 500, false, e.message, 'Error')
            }
        }
    }
}

module.exports = Home