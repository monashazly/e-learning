const router = require("express").Router()
const adminController = require("../app/controller/Admin.controller")


router.post('/addSubject', adminController.postAddSubject)





module.exports = router