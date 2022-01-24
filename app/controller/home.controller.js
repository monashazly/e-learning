const bcryptjs = require('bcryptjs/dist/bcrypt')
const otpGenerator = require('generate-serial-key')
const studentModel = require('../../models/student.model')
const teacherModel = require('../../models/teacher.model')
const resData = require('../helper/resData')
const sendEmail = require('../helper/sendEmail')

const register = async (req, res, table) => {
    try {
        let { name, email, password } = req.body
        let data = { name, email, password }
        let user = new table(data)
        user.process.activationOTP = otpGenerator.generate(12, "")
        await user.save()
        sendEmail(user.email, 'Activation Email', `<!doctype html>
        <html lang="en-US">
        
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Confirm Your Email</title>
            <meta name="description" content="Reset Password Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                               <!---- <td style="text-align:center;">
                                  <a href="https://rakeshmandal.com" title="logo" target="_blank">
                                    <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">
                                  </a>
                                </td>
                            </tr>-->
                           
                            <tr>
                                <td style="height:100px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Welcome to our Web site</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #e28e20; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    We're excited to have you get started. First, you need to confirm your account. Just press the button below.
                                                </p>
                                                <a href="http://localhost:3000/activation/${user._id}/${user.process.activationOTP}"
                                                
                                                    style="background:#e28e20;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">confirm
                                                    your email</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                  <!--  <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.rakeshmandal.com</strong></p>-->
                                </td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
        
        </html>`
            // <a href="http://localhost:3000/activation/${user._id}/${user.process.activationOTP}">Click here</a>
        )
        resData(res, 200, true, user, 'data inserted successfully')
    } catch (e) {
        resData(res, 500, false, e.message, 'error in insertion')
    }
}
const login = async (req, res, table) => {
    try {
        let user = await table.login(req.body.email, req.body.password)
        let token = await user.GenerateToken()
        user.tokens.push({ token })
        await user.save()
        resData(res, 200, true, token, 'logged in successfully')
    } catch (e) {
        resData(res, 500, false, e.message, 'Error')
    }
}
const activationOTP = async (req, res, table) => {
    try {
        let _id = req.params.id;
        let activationOTP = req.params.activationOTP
        let user = await table.findOneAndUpdate({ _id, 'process.activationOTP': activationOTP }, { 'process.activationOTPStatus': true, 'process.activationOTP': "" })
        if (!user) return resData(res, 200, true, user, 'this link is not valid')
        if (user.process.activationOTPStatus === true) return resData(res, 200, true, user, 'this user is already activated')
        resData(res, 200, true, '', 'this user is activated Successfuly')
    } catch (e) {
        resData(res, 500, false, e.message, 'error in active user try again')
    }
}
const ResetPasswordForm = async (req, res, table) => {
    try {
        let _id = req.params.id
        let resetPasswordOTP = req.params.resetPasswordOTP
        let password = req.body.password
        let user = await table.findOne({ _id, 'process.resetPasswordOTP': resetPasswordOTP })
        if (!user) return resData(res, 200, true, '', 'this link is not valid')
        if (user.process.resetPasswordTime < Date.now()) resData(res, 200, true, '', 'this link expired')
        let hashPassword = await bcryptjs.hash(password, +process.env.PASSWORDHASH)
        user.password = hashPassword;
        await user.save()
        resData(res, 200, true, '', 'password Chenged Successfuly')
    } catch (e) {
        resData(res, 500, false, e.message, 'Error in handling process try again later')
    }
}
const ResetPassword = async (req, res, table) => {
    try {
        let email = req.body.email
        let user = await table.findOne({ email })
        if (!user) return resData(res, 200, true, '', 'this email does not found')
        if (user.process.resetPasswordTime > Date.now()) return resData(req, 200, true, '', 'the link already sent before, try again later')
        user.process.resetPasswordOTP = otpGenerator.generate(12, "")
        user.process.resetPasswordTime = Date.now() + (15 * 60 * 1000)
        await user.save()
        let link = `http://localhost:3000/resetPassword/${user._id}/${user.process.resetPasswordOTP}`
        sendEmail(user.email, 'Reset Password', `<!doctype html>
        <html lang="en-US">
        
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Reset Password Email Template</title>
            <meta name="description" content="Reset Password Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                               <!---- <td style="text-align:center;">
                                  <a href="https://rakeshmandal.com" title="logo" target="_blank">
                                    <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">
                                  </a>
                                </td>
                            </tr>-->
                           
                            <tr>
                                <td style="height:100px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                    requested to reset your password</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #e28e20; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    We cannot simply send you your old password. A unique link to reset your
                                                    password has been generated for you. To reset your password, click the
                                                    following link and follow the instructions within 15 minutes.
                                                </p>
                                                <a href="http://localhost:3000/resetPassword/${user._id}/${user.process.resetPasswordOTP}"
                                                    style="background:#e28e20;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                    Password</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="text-align:center;">
                                  <!--  <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.rakeshmandal.com</strong></p>-->
                                </td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
        
        </html>`)
        resData(res, 200, true, `${link}`, 'Link has been Send Successfuly to Email')
    } catch (e) {
        resData(res, 500, false, e.message, 'Error in handling process try again later')
    }
}

class Home {
    static postRegister = (req, res) => {
        if (req.body.userType == 'student') register(req, res, studentModel)
        else if (req.body.userType == 'teacher') register(req, res, teacherModel)
    }

    static postLogin = (req, res) => {
        if (req.body.userType == 'student') login(req, res, studentModel)
        else if (req.body.userType == 'teacher') login(req, res, teacherModel)
    }

    static getActivationOTP = async (req, res) => {
        if (req.params.id.startsWith('T')) activationOTP(req, res, teacherModel)
        else if (req.params.id.startsWith('S')) activationOTP(req, res, studentModel)

    }

    static postResetPassword = async (req, res) => {
        if (req.params.id.startsWith('T')) ResetPassword(req, res, teacherModel)
        else if (req.params.id.startsWith('S')) ResetPassword(req, res, studentModel)
    }

    static postResetPasswordForm = async (req, res) => {
        if (req.params.id.startsWith('T')) ResetPasswordForm(req, res, teacherModel)
        else if (req.params.id.startsWith('S')) ResetPasswordForm(req, res, studentModel)
    }

}



module.exports = Home






/*
Date.now() => to end    => 100 + 30 ms
Date.now() => for Check => 120 ms

if(check > end) false
if(end < check) true

        past        present         future
         50           100             150

        15 min => 90000 MS


*/





















