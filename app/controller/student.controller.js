const studentModel = require('../../models/studentmodel')
const bycryptjs = require("bcryptjs")
class Student {
  //  - //[myCourses]// - [profile] - [edit Profile] - //[exames]//
  //[add course]// - [delete course]
  static PostRegister = async (req, res) => {
    try {
      let student = new studentModel(req.body)
      await student.save()
      res.status(200).send({
        data: student,
        apistatus: true,
        message: 'data inserted successfully'

      })
    } catch (e) {
      res.status(500).send({
        apistatus: false,
        data: e.message,
        message: 'error in insertion'
      })
    }

  }
  static PostLogin = async (req, res) => {
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
  }
  static postEditProfile = async (req, res) => {
    try {
      const student = await studentModel.findOne({ _id: req.params.id })
      student.name = req.body.name
      student.password = await bycryptjs.hash(req.body.password, parseInt(process.env.PASSWORDHASH))
      student.save()
      res.send({
        data: student
      })
    }
    catch (e) {
      res.send(e.message)
    }
    //upload photo
  }
}
module.exports = Student
