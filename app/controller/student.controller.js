const studentModel = require('../../models/student.model')
const bycryptjs = require('bcryptjs')
const resData = require('../helper/resData')
var ObjectId = require('mongoose').Types.ObjectId;

class Student {
  //exams
  static postEditProfile = async (req, res) => {
    try {
      let student = await studentModel.findByIdAndUpdate(
        { _id: req.params.id }, req.body, { runValidators: true, new: true, });
      // student.name = req.body.name || student.name
      // student.email = req.body.email || student.email
      // student.password = await bycryptjs.hash(req.body.password, +process.env.PASSWORDHASH)
      // student.save()
      resData(res, 200, true, student, "update done Succsessfuly");
    } catch (e) {
      res.send(e.message);
    }
  };
  static postprofile = async (req, res) => {
    try {
      let student = req.user;
      resData(res, 200, true, student, "your Data showed");
    } catch (e) {
      resData(res, 500, false, e.message, "Error finding data");
    }
  };
  static getAddCourse = async (req, res) => {
    try {
      let subjectID = req.params.subid;
      let student = req.user;

      let subject = student.subjects.find((sub) => sub == subjectID);
      if (subject)
        return resData(res, 200, true, "", "this subject is already exsist");
      student.subjects.push(subjectID);
      await student.save();
      resData(res, 200, true, student, "course added successfully");
    } catch (e) {
      res.send(e.message);
    }
  };
  static postDeleteCourse = async (req, res) => {
    try {
      let _id = req.params.subid;
      let student = req.user;
      let subject = student.subjects.includes(_id);

      if (!subject) return resData(res, 200, true, "", "subject doesn't exist");
      student.subjects = student.subjects.filter((u) => u._id != _id);
      await student.save();

      resData(res, 200, true, student.subjects, "course deleted successfully");
    } catch (e) {
      resData(res, 500, false, e.message, "error deleting course");
    }
  };
  static postCourses = async (req, res) => {
    try {
      let student = req.user;
      let _id = student._id
      let s = await studentModel.findOne({ _id }).populate('subjects')
      resData(res, 200, true, s.subjects, "your enrolled courses")
    } catch (e) {
      resData(res, 500, false, e.message, "error fetching courses")
    }
  };
}

module.exports = Student
