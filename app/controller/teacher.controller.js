const req = require("express/lib/request")
const subjectModel = require("../../models/subject.model")
const teacherModel = require("../../models/teacher.model");
const resData = require('../helper/resData')

class Teacher {

    static postVideo = async (req, res) => {
        try {
            let subject = await subjectModel.findOne({ _id: req.params.id });
            req.body.link = (req.body.link).replace("watch?v=", "embed/");
            subject.videos.push(req.body);
            await subject.save();
            resData(res, 200, true, subject, `${subject.name} video Added Successfuly`)

        }
        catch (e) {
            resData(res, 500, false, e.message, "failed")
        }
    }
    static deleteVideo = async (req, res) => {
        try {
            let subject = await subjectModel.findOne({ _id: req.params.id });
            subject.videos.forEach((video, i) => {
                if (video.videoName == req.params.videoName) {
                    subject.videos.splice(i, 1);
                }
            });
            await subject.save();
            resData(res, 200, true, subject.videos, `${req.params.videoName} deleted Successfuly`)
        }
        catch (e) {
            resData(res, 500, false, e.message, "failed")
        }
    }
    static showProfile = async (req, res) => {
        try {
            const teacher = await teacherModel.findById(req.params.id)
            if (!teacher) { return resData(res, 404, true, null, `profile not found`) }
            resData(res, 200, true, teacher, `profile found`)
        }
        catch (e) {
            resData(res, 500, false, e.message, "failed")
        }
    }
    static editProfile = async (req, res) => {
        try {
            const teacher = await teacherModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            )
            if (!teacher) { return resData(res, 404, true, null, `profile not found`) }
            resData(res, 200, true, teacher, `profile found and updated`)
        }
        catch (e) {
            resData(res, 500, false, e.message, "failed")
        }
    }
    static postAddExam=async(req,res)=>{
        try{
            let subject=await subjectModel.findById(req.params.subId);
            if(!subject)return resData(res, 404, true, subject, `subject not found`)
            subject.exames.push(req.body);
            await subject.save()
            resData(res, 200, true, subject, "exam added")
        }
        catch{
            resData(res, 500, false, e.message, "failed")
        }
    }
    static getAllCourses=async(req,res)=>{
        try{let resp= await teacherModel.findOne({_id:req.params.teacherId}).populate('subjects')
        res.send(resp.subjects)}
        catch(e){
            resData(res, 500, false, '', e.message)
        }
    }
    static getSingleCourse= async(req,res)=>{
        try{let resp= await subjectModel.findOne({_id:req.params.subjectId});
        res.send(resp)}
        catch(e){
            resData(res, 500, false, '', e.message)
        }
    }
}
module.exports = Teacher