const req = require("express/lib/request")
const subjectModel = require("../../models/subject.model")

const resData = (res, statusCode, apiStatus, data, message) => {
    res.status(statusCode).send({
        apiStatus,
        data,
        message,
    })
}

class Teacher{
    static pendingTeacher=async(req, res)=>{
        try{
            let teacher = new teacherModel(req.body)
            await teacher.save()
            res.send(teacher)
        }
        catch(e){
            res.send(e)
        }
    }
    static postVideo=async(req,res)=>{
        try{
            let subject=await subjectModel.findOne({name:req.params.subject});
            req.body.link=(req.body.link).replace("watch?v=","embed/");
            subject.videos.push(req.body);
            await subject.save();
            resData(res, 200, true, subject, `${req.params.subject} video Added Successfuly`)
            
        }
        catch(e){
            resData(res, 500, false, e.message, "failed")
        }
    }
    static deleteVideo=async(req,res)=>{
        try{
            let subject=await subjectModel.findOne({name:req.params.subject});
            subject.videos.forEach((video,i) => {
                if(video.videoName==req.params.videoName){
                    subject.videos.splice(i,1);
                    
                }
            });
            await subject.save();
            resData(res, 200, true, subject.videos, `${req.params.videoName} deleted Successfuly`)
        }
        catch(e){
            resData(res, 500, false, e.message, "failed")
        }
    }
    // static postTest=async(req,res)=>{
    //     try{
    //         let subject=await subjectModel.findOne({name:req.params.subject});
    //         (subject.exames).push(req.body);
    //         await subject.save();
    //         resData(res, 200, true, subject, `${req.params.subject} test Added Successfuly`)
            
    //     }
    //     catch(e){
    //         resData(res, 500, false, e.message, "failed")
    //     }
    // }

}
module.exports=Teacher