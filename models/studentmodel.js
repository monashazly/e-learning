const  mongoose=require("mongoose")
const validator =require("validator")
const bycryptjs =require("bcryptjs")
const studentSchema= new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
      type:String,
      trim:true,
      required:true,
      unique:true,
      validate(value){
         if (!validator.isEmail(value)) throw new Error("invalid email format")
      }
    },
    password:{
        type:String,
        minlength:7,
        trim:true,
        required:true
    },
    subjects:[{
        subjectName:{
            type:String,
            required:true
        },
        grade:{}
    }]
     
},{tiemstamps:true})
studentSchema.pre("save",async function(){
    const student=this
    if(student.isModified("password"))
      student.password=await bycryptjs.hash(student.password,parseInt(process.env.PASSWORDHASH))

})
const Student=mongoose.model("Student",studentSchema)
module.exports=Student
