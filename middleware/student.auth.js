const jwt = require('jsonwebtoken');
const studentModel = require('../models/student.model')
const resData = require('../app/helper/resData');

const studentAuth = async (req, res, next) => {
    try {
        let token = req.header('Authorization').replace('bearer ', "")
        let newtoken = token.slice(1)
        let data = jwt.verify(newtoken, process.env.TOKENHASHSECRET)
        let user = await studentModel.findOne({ _id: data._id, 'tokens.token': token })
        if (!user) throw new Error("you are not authorized")
        if (!user.process.activationOTPStatus) throw new Error("Active Your account first")
        if (!user.process.blocked) throw new Error("Your account blocked contact the admin")
        req.user = user
        req.token = token
        next()

    } catch (e) {
        resData(res, 500, true, e.message, 'failed to get this page')
    }
}

module.exports = studentAuth