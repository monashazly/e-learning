const router = require("express").Router()
const studentController = require("../app/controller/student.controller")

router.post("/studentregister", studentController.PostRegister)
router.post("/studentlogin", studentController.PostLogin)
router.post('/edit/:id', studentController.postEditProfile)

module.exports = router