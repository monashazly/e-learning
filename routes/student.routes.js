const router = require("express").Router()
const studentController = require("../app/controller/student.controller")
const auth = require('../middleware/all.auth')

router.post('/edit/:id', auth, studentController.postEditProfile)
router.post('/profile/:id',auth,studentController.postprofile)
router.get('/addcourse/:subid',auth,studentController.getAddCourse)
router.post('/deletecourse/:subid',auth,studentController.postDeleteCourse)
router.post('/mycourses/:id',auth,studentController.postCourses)

module.exports = router