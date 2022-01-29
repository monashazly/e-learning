const router = require("express").Router()
const studentController = require("../app/controller/student.controller")
const auth=require('../middleware/student.auth')


router.post('/edit/:id',auth, studentController.postEditProfile)
router.get('/profile/:id', auth,studentController.getprofile)
router.get('/addcourse/:subid',auth, studentController.getAddCourse)
router.post('/deletecourse/:subid',auth, studentController.postDeleteCourse)
router.post('/mycourses/:id', auth,studentController.postCourses)

module.exports = router