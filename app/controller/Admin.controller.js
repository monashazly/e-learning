const subjectModel = require('../../models/subject.model')
const teacherModel = require('../../models/teacher.model')
const adminModel = require('../../models/admin.model')
const studentModel = require('../../models/student.model')

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
    static getProfile = async (req, res) => {
        res.status(200).send({ apiStatus: true, data: req.user, message: "data featched" })
    }
    static postEditProfile = async (req, res) => {
        let user = req.user
        let { name, email } = req.body
        try {
            user.name = name; user.email = email
            await user.save()
            resData(res, 200, true, user, 'data updated Successfuly')
        } catch (e) {
            resData(res, 500, false, e.message, 'faild in update data')
        }
        res.status(200).send({ apiStatus: true, data: req.user, message: "data featched" })
    }

    static postAddMainSubject = async (req, res) => {
        try {
            let subject = new subjectModel(req.body);
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
            let teachers = await teacherModel.find({}).populate('subjects');
            if (teachers.length == 0) return resData(res, 200, true, teachers, 'No teachers yet')
            resData(res, 200, true, teachers, 'data fetched Successfuly')
        } catch (e) {
            resData(res, 500, false, e.message, 'faild in fetch Data')
        }
    }

    static getTeacher = async (req, res) => {
        try {
            let _id = req.params.id
            let teacher = await teacherModel.find({ _id }).populate('subjects')
            if (!teacher) return resData(res, 200, true, teacher, 'No teacher matched')
            resData(res, 200, true, teacher, 'data fetched Successfuly')
        } catch (e) {
            resData(res, 500, false, e.message, 'faild in fetch Data')
        }
    }

    static getActiveTeacher = async (req, res) => {
        try {
            let _id = req.params.id
            let teacher = await teacherModel.findOneAndUpdate({ _id }, { activationAdmin: true })
            if (!teacher) return resData(res, 200, true, teacher, 'this teacher is not register make new account')
            if (teacher.activationAdmin === 'true') return resData(res, 200, true, teacher, 'this teacher is already active')
            resData(res, 200, true, teacher, 'this teacher actived successfuly')
        } catch (e) {
            resData(res, 500, false, e.message, 'faild in fetch Data')
        }
    }

    static getBlockTeacher = async (req, res) => {
        try {
            let _id = req.params.id
            let user = await teacherModel.findOneAndUpdate({ _id }, { blocked: true });
            if (!user) return resData(res, 200, true, user, 'user is not valid')
            if (user.blocked) return resData(res, 200, true, user, 'Teacher is already Blocked')
            resData(res, 200, true, user, 'Teacher Blocked Successfuly')
        } catch (e) {
            resData(res, 500, true, e.message, 'Error in block teacher')
        }
    }
    static getBlockStudent = async (req, res) => {
        try {
            let _id = req.params.id
            let user = await studentModel.findOneAndUpdate({ _id }, { blocked: true });
            if (!user) return resData(res, 200, true, user, 'user is not valid')
            if (user.blocked) return resData(res, 200, true, user, 'Student is already Blocked')
            resData(res, 200, true, user, 'Student Blocked Successfuly')
        } catch (e) {
            resData(res, 500, true, e.message, 'Error in block Student')
        }
    }

    static getAddSubjectTeacher = async (req, res) => {
        try {
            let subjectId = req.params.subId;
            let teachId = req.params.teachId
            let teacher = await teacherModel.findOne({ _id: teachId });
            if (!teacher) return resData(res, 200, true, null, 'no teacher matched')
            let subject = teacher.subjects.find(sub => sub == subjectId)
            if (subject) return resData(res, 200, true, '', 'this subject is already exsist')
            teacher.subjects.push(subjectId)
            await teacher.save()
            resData(res, 200, true, teacher, 'this subject added Successfuly')
        } catch (e) {
            resData(res, 500, false, e.message, 'faild in add subject')
        }
    }

    static getDeleteVideo = async (req, res) => {
        try {
            let _id = req.params.id
            let subject = await subjectModel.findOne({ 'videos._id': _id })
            if (!subject) return resData(res, 200, true, null, 'this Video id is not valid')
            subject.videos = subject.videos.filter(vid => vid._id != _id)
            await subject.save()
            resData(res, 200, true, '', 'video deleted Successfuly')
        } catch (e) {
            resData(res, 500, false, '', e.message)
        }

    }
}



module.exports = admin
