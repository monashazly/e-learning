const router = require("express").Router()
const teacherController = require("../app/controller/teacher.controller")
const teacherModel = require("../models/teacher.model");
const subjectModel=require("../models/subject.model");
const teacherSubject=require("../models/teacherSubject.model")
const auth =require("../middleware/all.auth")
const authTeacher=require("../middleware/teacher.auth")


//  [add test] 


router.post("/postVideo/:id",auth,authTeacher, teacherController.postVideo)

router.delete("/deleteVideo/:id/:videoName",auth,authTeacher, teacherController.deleteVideo)

router.get("/showTeacherProfile/:id",auth,authTeacher,teacherController.showProfile)

router.post("/editTeacherProfile/:id",auth,authTeacher,teacherController.editProfile)

router.post("/addExam/:subId",auth,authTeacher,teacherController.postAddExam)


//add subject to teacher

//show teacher courses
router.get("/all/subjects/:teacherId",async(req,res)=>{
    let resp=await teacherSubject.findOne({_id:req.params.teacherId}).subjects.populate("subject");
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