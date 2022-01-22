const subjectModel = require('../../models/subject.model')
const teacherModel = require('../../models/teacher.model')
const adminModel = require('../../models/admin.model')

const resData = require('../helper/resData')

class admin {
    static login = async (req, res) => {
        try {
            let admin = await adminModel.loginAdmin(req.body.email, req.body.password)
            await admin.generateToken()
            res.status(200).send({ apiStatus: true, data: { admin }, message: "logged in" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "invalid data" })
        }
    }
    static me = async (req, res) => {
        res.status(200).send({ apiStatus: true, data: req.user, message: "data featched" })
    }


    static postAddSubject = async (req, res) => {
        try {
            let subject = new subjectModel(req.body);
            // res.send(subject)
            await subject.save()
            resData(res, 200, true, subject, 'subject Added Successfuly')
        } catch (e) {
            resData(res, 500, false, e.message, 'faild in add subject')
        }
    }
    static delMainSubject = async (req, res) => {
        try {
            let _id = req.params.id;
            let subject = await subjectModel.findByIdAndDelete({ _id })
            if (!subject) return resData(res, 200, true, subject, "Subject id is not valid ")
            resData(res, 200, true, subject, 'subject Deleted Successfuly')
        } catch (e) {
            resData(res, 500, false, e.message, 'faild in Delete Subject')
        }
    }

    static getAllTeachers = async (req, res) => {
        try {
            let teachers = await teacherModel.find({});
            if (teachers.length == 0) return resData(res, 200, true, teachers, 'No teachers yet')
            resData(res, 200, true, teachers, 'data fetched Successfuly')
        } catch (e) {
            resData(res, 500, false, e.message, 'faild in fetch Data')
        }
    }


    static getTeacher = async (req, res) => {
        try {
            let _id = req.params.id
            let teacher = await teacherModel.find({ _id })
            if (!teacher) return resData(res, 200, true, teacher, 'No teacher matched')
            resData(res, 200, true, teacher, 'data fetched Successfuly')
        } catch (e) {
            resData(res, 500, false, e.message, 'faild in fetch Data')
        }
    }


    static activeTeacher = async (req, res) => {
        try {
            let _id = req.params.id
            let teacher = await teacherModel.findOneAndUpdate({ _id }, { active: true })
            if (!teacher) return resData(res, 200, true, teacher, 'this teacher is not register make new account')
            if (teacher.active === 'true') return resData(res, 200, true, teacher, 'this teacher is already active')
            resData(res, 200, true, teacher, 'this teacher actived successfuly')
        } catch (e) {
            resData(res, 500, false, e.message, 'faild in fetch Data')
        }
    }
}



module.exports = admin
