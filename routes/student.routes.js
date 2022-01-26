const router = require("express").Router()
const studentController = require("../app/controller/student.controller")


router.post('/edit/:id', studentController.postEditProfile)
router.post('/profile/:id', studentController.postprofile)
router.get('/addcourse/:subid', studentController.getAddCourse)
router.post('/deletecourse/:subid', studentController.postDeleteCourse)
router.post('/mycourses/:id', studentController.postCourses)

module.exports = router