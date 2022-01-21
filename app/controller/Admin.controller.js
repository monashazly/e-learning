const subjectModel = require('../../models/subject.model')
const otpGenerator = require('otp-generator')
const adminModel = require('../../models/Admin.model')


const resData = (res, statusCode, apiStatus, data, message) => {
    res.status(statusCode).send({
        apiStatus,
        data,
        message,
    })
}

class admin {
    static login = async (req, res) => {
        try {
            let admin = await adminModel.loginAdmin(req.body.email, req.body.password)
            let token = await adminModel.generateToken()
            res.status(200).send({ apiStatus: true, data: { admin, token }, message: "logged in" })
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

}



module.exports = admin
