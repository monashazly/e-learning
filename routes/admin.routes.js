const router = require("express").Router()
const adminController = require("../app/controller/Admin.controller")


router.post("/login", adminController.login)

router.get('/profile', adminController.getProfile)
router.post('/editProfile', adminController.postEditProfile)

router.post('/addSubject', adminController.postAddMainSubject)
router.delete('/delMainSubject/:id', adminController.delMainSubject)

router.get('/active-teacher/:id', adminController.getActiveTeacher)
router.get('/teachers', adminController.getAllTeachers)
router.get('/teacher/:id', adminController.getTeacher)
router.get('/block-teacher/:id', adminController.getBlockTeacher)

router.get('/block-student/:id', adminController.getBlockStudent)





module.exports = router
