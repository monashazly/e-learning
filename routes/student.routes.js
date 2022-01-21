const router = require("express").Router()
const studentController = require("../app/controller/student.controller")
const auth = require('../middleware/all.auth')

router.post('/edit/:id', auth, studentController.postEditProfile)

module.exports = router