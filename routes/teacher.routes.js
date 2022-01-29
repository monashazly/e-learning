const router = require("express").Router()
const teacherController = require("../app/controller/teacher.controller")
const auth = require('../middleware/teacher.auth')

//  [add test] 

router.post("/postVideo/:id", auth, teacherController.postVideo)
router.delete("/deleteVideo/:id/:videoName", auth, teacherController.deleteVideo)
router.get("/showTeacherProfile/:id", auth, teacherController.showProfile)
router.post("/editTeacherProfile/:id", auth, teacherController.editProfile)
router.post("/addExam/:subId", auth, teacherController.postAddExam)
router.get("/subjects/:teacherId", auth, teacherController.getAllCourses)
router.get("/single/:subjectId", auth, teacherController.getSingleCourse)


module.exports = router