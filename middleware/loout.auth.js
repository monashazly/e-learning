const adminModel = require('../models/admin.model');
const studentModel = require('../models/student.model')
const teacherModel = require('../models/teacher.model')
const jwt = require('jsonwebtoken');
const resData = require('../app/helper/resData');

const authAdmin = async (req, res, next) => {
    try {
        let token = req.header('Authorization').replace('bearer ', "");
        let newToken = token.slice(1)
        let data = jwt.verify(newToken, process.env.TOKENHASHSECRET);
        let user = await teacherModel.findOne({ _id: data._id, token })
        if (!user) throw new Error("You are not authorized")
        req.user = user;
        req.token = token
        next()
    } catch (e) {
        resData(res, 500, false, e.message, 'faild to get this page')
    }
}

module.exports = authAdmin