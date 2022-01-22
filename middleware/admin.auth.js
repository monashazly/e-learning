const adminModel = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const resData = require('../app/helper/resData');

const authAdmin = async (req, res, next) => {
    try {
        let token = req.header('Authorization').replace('bearer ', "");
        let data = jwt.verify(token, process.env.TOKENHASHSECRET);
        let user = await adminModel.findOne({ _id: data._id, token })
        if (!user) return resData(res, 200, true, user, 'faild in authorized');
        resData(res, 200, true, user, 'logged in..');
        req.user = user;
        req.token = token
        next()
    } catch (e) {
        resData(res, 500, false, e.message, 'Unauthorized')
    }
}

module.exports = authAdmin