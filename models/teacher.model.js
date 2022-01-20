const mongoose = require("mongoose");
const validator = require('validator')
const bcryptjs=require("bcryptjs");
const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        minlength:6,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email format")
        }
    }
},
{timestamps:true}
)
teacherSchema.pre("save",async function(){
    const user=this
    if(user.isModified("password"))
    user.password= await bcryptjs.hash(user.password,12)
})
const Teacher = mongoose.model("Teacher", teacherSchema)
module.exports = Teacher