const router = require("express").Router()
const teacherController = require("../app/controller/teacher.controller")
const teacherModel = require("../models/teacher.model");
const subjectModel=require("../models/subject.model");
const teacherSubject=require("../models/teacherSubject.model")
const auth =require("../middleware/all.auth")
const authTeacher=require("../middleware/teacher.auth")


//  [add test] 


router.post("/postVideo/:id",auth,authTeacher, teacherController.postVideo)

router.delete("/deleteVideo/:id/:videoName",auth,authTeacher, teacherController.deleteVideo)

router.get("/showTeacherProfile/:id",auth,authTeacher,teacherController.showProfile)

router.post("/editTeacherProfile/:id",auth,authTeacher,teacherController.editProfile)

router.post("/addExam/:subId",auth,authTeacher,teacherController.postAddExam)

router.get("/subjects/:teacherId",auth,authTeacher,teacherController.getAllCourses)

router.get("/single/:subjectId",auth,authTeacher,teacherController.getSingleCourse)

module.exports = router