const router = require("express").Router()
const teacherController = require("../app/controller/teacher.controller")
const teacherModel = require("../models/teacher.model");
const subjectModel=require("../models/subject.model");
const teacherSubject=require("../models/teacherSubject.model")


//  [add test] 


router.post("/postVideo/:id", teacherController.postVideo)

router.delete("/deleteVideo/:id/:videoName", teacherController.deleteVideo)

router.get("/showTeacherProfile/:id",teacherController.showProfile)

router.post("/editTeacherProfile/:id",teacherController.editProfile)
//add subject to teacher
router.get("/add/:teacher/:subject",async(req,res)=>{

    let teacher= await teacherModel.findOne({name:req.params.teacher})
    let subject=await subjectModel.findOne({name:req.params.subject})
    let subjectTeacher= await new teacherSubject({teacher:teacher._id,subject:subject._id})
    await subjectTeacher.save();
    res.send(subjectTeacher);
})
//show teacher courses
router.get("/all/subjects/:teacher",async(req,res)=>{
    let resp=await teacherSubject.find({teacher:req.params.teacher}).populate("subject");
    console.log(resp)
    res.send(resp)
})
//show teacher single course
router.get("/single/:subject/:teacher",async(req,res)=>{
    let resp= await teacherSubject.findOne({teacher:req.params.teacher,subject:req.params.subject}).populate("subject").populate("teacher");
    console.log(resp)
    res.send(resp)
})
module.exports = router