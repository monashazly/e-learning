const router=require("express").Router()
const StudentController=require("../app/controller/student.controller")

router.post("/register",StudentController.postRegister)
router.post('/login')



router.post('/adminLogin')
router.post('/admin/addTeacher',authAdmin,)

module.exports=router