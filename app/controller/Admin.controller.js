const adminModel = require("../../models/Admin.model")
//const emailHelper = require("../helper/sendMail.helper")
const otpGenerator = require('otp-generator')


class Admin {
    static login = async(req, res)=>{
        try{
            let admin = await adminModel.loginAdmin(req.body.email, req.body.password)
            let token = await admin.generateToken()
            res.status(200).send({apiStatus:true, data:{admin, token}, message:"logged in"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e.message, message:"invalid data"})
        }
    }
    static me = async(req,res)=>{
        res.status(200).send({apiStatus:true, data:req.user, message:"data featched"})
    }
}
module.exports = Admin