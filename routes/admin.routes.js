const router = require("express").Router()
const adminController = require("../app/controller/Admin.controller")

// control admin
router.post('/add-admin', adminController.postAddAdmin)
router.post("/login", adminController.login)
router.get('/profile', adminController.getProfile)
router.post('/editProfile', adminController.postEditProfile)

// control subject
router.post('/addSubject', adminController.postAddMainSubject)
router.delete('/delMainSubject/:id', adminController.delMainSubject)
router.delete('/delVideo/:id', adminController.getDeleteVideo)

// control teacher
router.get('/teachers', adminController.getAllTeachers)
router.get('/teacher/:id', adminController.getTeacher)
router.get('/active-teacher/:id', adminController.getActiveTeacher)
router.get('/block-teacher/:id', adminController.getBlockTeacher)
router.get('/addSubject-teacher/:teachId/:subId', adminController.getAddSubjectTeacher)

// control student
router.get('/block-student/:id', adminController.getBlockStudent)





module.exports = router
