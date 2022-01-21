const router = require("express").Router()
const adminController = require("../app/controller/Admin.controller")


router.post("/login", adminController.login)
router.post('/addSubject', adminController.postAddSubject)
router.delete('/delMainSubject/:id', adminController.delMainSubject)
// router.post('/login', adminController.adminLogin)
router.get('/teachers', adminController.getAllTeachers)
router.get('/teacher/:id', adminController.getTeacher)



module.exports = router
