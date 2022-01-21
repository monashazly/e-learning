const router = require("express").Router()
const teacherController = require("../app/controller/teacher.controller")


// [register] - [add video] - [delete video] - [add test] - [allCourses] - [singleCourse] - [edit profile]

router.post("/pendingTeacher", teacherController.pendingTeacher)

router.post("/postVideo/:subject", teacherController.postVideo)

router.delete("/deleteVideo/:subject/:videoName", teacherController.deleteVideo)




module.exports = router