const studentModel = require('../../models/studentmodel')

class Home {
    static postLogin = async (req, res) => {
        if (req.body.status == 'student') {
            try {
                let student = await studentModel.login(req.body.email, req.body.password)
                let token = await student.GenerateToken()
                res.status(200).send({
                    apistatus: true,
                    data: { student, token },
                    message: 'logged in successfully'
                })
            } catch (e) {
                res.status(500).send({
                    data: e.message,
                    apistatus: false,
                    message: 'Error'
                })
            }
        } else {
            res.send(req.body)
        }
    }
}

module.exports = Home