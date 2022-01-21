const router = require("express").Router()
const teacherController = require("../app/controller/teacher.controller")


// [add test] - [allCourses] - [singleCourse] - [edit profile]


// english 

router.post("/postVideo/:subject", teacherController.postVideo)

router.delete("/deleteVideo/:subject/:videoName", teacherController.deleteVideo)




module.exports = router