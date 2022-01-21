const mongoose = require("mongoose")
const validator = require('validator')
const bcryptjs = require("bcryptjs")
const Admin = require("../app/controller/Admin.controller")

const adminSchema = new mongoose.Schema({
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
    },
    tokens:[ {token:{type:String, required:true}} ],
    otp:{
        type:String,
        default:Date.now()
    }
},
{timestamps:true}
)
//adminLogIn
adminSchema.statics.loginAdmin = async(email,password)=>{
    const admin = await Admin.findOne({email})
    if(!admin) throw new Error("invalid admin email")
    const isValid = await bcryptjs.compare(password, admin.password)
    if(!isValid) throw new Error("invalid password")
    return admin
}
const adminModel = mongoose.model('admin',adminSchema);


module.exports = adminModel