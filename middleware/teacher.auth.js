const resData = require("../app/helper/resData");

const teacherAuth = async (req, res, next) => {
    let user = req.user;
    if (user._id.startsWith('T')) next()
    else resData(res, 200, true, 'this site for teacher only', 'you are not authorized')
}


module.exports = teacherAuth