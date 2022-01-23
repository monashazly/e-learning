const router = require("express").Router()
const adminController = require("../app/controller/Admin.controller")

// control admin
router.post("/login", adminController.login)
router.get('/profile', adminController.getProfile)
router.post('/editProfile', adminController.postEditProfile)

// control subject
router.post('/addSubject', adminController.postAddMainSubject)
router.delete('/delMainSubject/:id', adminController.delMainSubject)

// control teacher
router.get('/teachers', adminController.getAllTeachers)
router.get('/teacher/:id', adminController.getTeacher)
router.get('/active-teacher/:id', adminController.getActiveTeacher)
router.get('/block-teacher/:id', adminController.getBlockTeacher)
router.get('/addSubject-teacher/:teachId/:subId', adminController.getAddSubjectTeacher)
// localhost:3000/addSubject-teacher/T61ed7d28e53a571e112e9636/61ed7e17fb2ac0f647b19c71
// control student
router.get('/block-student/:id', adminController.getBlockStudent)





module.exports = router
