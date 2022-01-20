const router=require("express").Router()
const studentController=require("../app/controller/student.controller")

// router.post("/register",StudentController.postRegister)
// router.post('/login')



// router.post('/adminLogin')
// router.post('/admin/addTeacher',authAdmin,)
router.post("/studentregister",studentController.PostRegister)

module.exports=router