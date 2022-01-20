const router=require("express").Router()
const teacherController=require("../app/controller/teacher.controller")
const teacherModel=require("../models/teacher.model");

// [register] - [add video] - [delete video] - [add test] - [allCourses] - [singleCourse] - [edit profile]

router.post("/pendingTeacher",teacherController.pendingTeacher)

router.post("/postVideo/:subject",teacherController.postVideo)

router.delete("/deleteVideo/:subject/:videoName",teacherController.deleteVideo)

// router.post("/postTest/:subject",teacherController.addTest);


module.exports = router