const jwt = require('jsonwebtoken');

const studentModel = require('../models/student.model')
const teacherModel = require('../models/teacher.model')
const resData = require('../app/helper/resData');

const auth = async (req, res, next) => {

    try {
        let token = req.header('Authorization').replace('bearer ', "")
        let data = jwt.verify(token, process.env.TOKENHASHSECRET)
        if (data.type == 'student') {
            let user = await studentModel.findOne({ _id: data._id, 'tokens.token': token })
            if (!user) return resData(res, 200, true, '', 'Unauthorized')
            req.user = user
            req.token = token
            next()
        } else if (data.type == 'teacher') {
            let user = await teacherModel.findOne({ _id: data._id, 'tokens.token': token })
            if (!user) return resData(res, 200, true, '', 'Unauthorized')
            resData(res, 200, true, user, 'authorized')
            req.user = user
            req.token = token
            next()
        }
    } catch (e) {
        resData(res, 500, true, e.message, 'Unauthorized')
    }
}

module.exports = auth