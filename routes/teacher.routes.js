const router = require("express").Router()
const teacherController = require("../app/controller/teacher.controller")


// [add test] - [allCourses] - [singleCourse] - [edit profile]

router.post("/pendingTeacher", teacherController.pendingTeacher)

// english 

router.post("/postVideo/:subject", teacherController.postVideo)

router.delete("/deleteVideo/:subject/:videoName", teacherController.deleteVideo)

// router.post("/postTest/:subject",teacherController.addTest);


module.exports = router