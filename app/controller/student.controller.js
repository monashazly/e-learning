const studentModel=require("../../models/studentmodel")
class Student {
    // [register] - [login] - [myCourses] - [profile] - [edit Profile] - [exames] - [add course] - [delete course]
    static PostRegister=async(req,res)=>{
       try  {  let student =new studentModel(req.body)
           await student.save()
           res.status(200).send({
               data:student,
               apistatus:true,
               message:"data inserted successfully"
           })
        }
           catch(e){
               res.status(500).send({
                   apistatus:false,
                   data:e.message,
                   message:"error in insertion"
               })

           }
    }
   


}
module.exports=Student