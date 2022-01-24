const router = require("express").Router()
const teacherController = require("../app/controller/teacher.controller")
const teacherModel = require("../models/teacher.model");
const subjectModel=require("../models/subject.model");
const teacherSubject=require("../models/teacherSubject.model")


//  [add test] 


router.post("/postVideo/:id", teacherController.postVideo)

router.delete("/deleteVideo/:id/:videoName", teacherController.deleteVideo)

router.get("/showTeacherProfile/:id",teacherController.showProfile)

router.post("/editTeacherProfile/:id",teacherController.editProfile)

router.post("/addExam/:subId",teacherController.postAddExam)

router.get("/subjects/:teacherId",teacherController.getAllCourses)

router.get("/single/:subjectId",teacherController.getSingleCourse)

module.exports = router