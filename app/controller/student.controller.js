const studentModel = require('../../models/student.model')
const bycryptjs = require("bcryptjs")
const resData = require('../helper/resData')




class Student {
  //  - //[myCourses]// - [profile] - [edit Profile] - //[exames]//
  //[add course]// - [delete course]
  static postEditProfile = async (req, res) => {
    try {
      let student = await studentModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true, new: true
      })
      // student.name = req.body.name || student.name
      // student.email = req.body.email || student.email
      // student.password = await bycryptjs.hash(req.body.password, +process.env.PASSWORDHASH)
      // student.save()
      resData(res, 200, true, student, 'update done Succsessfuly')
    }
    catch (e) {
      res.send(e.message)
    }
    //upload photo
  }
}
module.exports = Student
