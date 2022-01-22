const router = require("express").Router()
const teacherController = require("../app/controller/teacher.controller")


//  [add test] - [allCourses] - [singleCourse] 


router.post("/postVideo/:id", teacherController.postVideo)

router.delete("/deleteVideo/:id/:videoName", teacherController.deleteVideo)

router.get("/showTeacherProfile/:id",teacherController.showProfile)

router.post("/editTeacherProfile/:id",teacherController.editProfile)


module.exports = router