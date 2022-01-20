const router=require("express").Router()
const AdminController=require("../app/controller/Admin.controller")
// const auth = require("../middleware/auth")
router.post("/login", AdminController.login)
//router.get("/all",auth,AdminController.showAll)
//router.get("/all/:id",auth, AdminController.showSingle)
//router.delete("/all",auth, AdminController.deleteAll)
//router.delete("/all/:id",auth, AdminController.deleteSingle)
//router.get("/activate/:otp/:id", AdminController.activateTeachear)

module.exports=router