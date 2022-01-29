const router = require("express").Router()
const adminController = require("../app/controller/Admin.controller")
const auth = require('../middleware/admin.auth')

// control admin
router.post("/login", adminController.login)
router.post('/add-admin', auth, adminController.postAddAdmin)
router.get('/profile', auth, adminController.getProfile)
router.post('/editProfile', auth, adminController.postEditProfile)

// control subject
router.post('/addSubject', auth, adminController.postAddMainSubject)
router.delete('/delMainSubject/:id', auth, adminController.delMainSubject)
router.delete('/delVideo/:id', auth, adminController.getDeleteVideo)

// control teacher
router.get('/teachers', auth, adminController.getAllTeachers)
router.get('/teacher/:id', auth, adminController.getTeacher)
router.get('/active-teacher/:id', auth, adminController.getActiveTeacher)
router.get('/block-teacher/:id', auth, adminController.getBlockTeacher)
router.get('/addSubject-teacher/:teachId/:subId', auth, adminController.getAddSubjectTeacher)

// control student
router.get('/block-student/:id', auth, adminController.getBlockStudent)





module.exports = router
