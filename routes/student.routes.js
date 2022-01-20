const router=require("express").Router()
const studentController=require("../app/controller/student.controller")

router.post("/studentregister",studentController.PostRegister)
router.post("/studentlogin",studentController.PostLogin)
router.get('/edit/:id',studentController.getEditProfile)

module.exports=router