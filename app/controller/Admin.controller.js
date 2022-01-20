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
            await subject.save()
            resData(res, 200, true, subject, 'subject Added Successfuly')
        } catch (e) {
            resData(res, 500, false, e.message, 'faild in add subject')
        }
    }
}



module.exports = admin