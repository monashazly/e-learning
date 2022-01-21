const router = require("express").Router()
const adminController = require("../app/controller/Admin.controller")


router.post("/login", adminController.login)
router.post('/addSubject', adminController.postAddSubject)
router.delete('/delMainSubject/:id', adminController.delMainSubject)



module.exports = router
