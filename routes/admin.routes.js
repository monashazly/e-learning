const router = require("express").Router()
const adminController = require("../app/controller/Admin.controller")


router.post('/addSubject', adminController.postAddSubject)
router.delete('/delMainSubject/:id', adminController.delMainSubject)
router.post('/login', adminController.adminLogin)




module.exports = router