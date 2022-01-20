const router=require("express").Router()
const TeacherController=require("../app/controller/teacher.controller")
const teacherModel=require("../models/teacher.model");

router.post("/pendingTeacher",async(req, res)=>{
    try{
        let teacher = new teacherModel(req.body)
        await teacher.save()
        res.send(teacher)
    }
    catch(e){
        res.send(e)
    }
})


module.exports = router