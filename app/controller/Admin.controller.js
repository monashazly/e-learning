const subjectModel = require('../../models/subject.model')

const resData = (res, statusCode, apiStatus, data, message) => {
    res.status(statusCode).send({
        apiStatus,
        data,
        message,
    })
}

class admin {
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

    static adminLogin = async (req, res) => {

    }
}



module.exports = admin