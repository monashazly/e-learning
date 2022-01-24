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
        sendEmail(user.email, 'Activation Email', `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
                @media screen {
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 400;
                        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 700;
                        src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 400;
                        src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 700;
                        src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                    }
                }
        
                /* CLIENT-SPECIFIC STYLES */
                body,
                table,
                td,
                a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
        
                /* RESET STYLES */
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                }
        
                table {
                    border-collapse: collapse !important;
                }
        
                body {
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                }
        
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
        
                /* MOBILE STYLES */
                @media screen and (max-width:600px) {
                    h1 {
                        font-size: 32px !important;
                        line-height: 32px !important;
                    }
                }
        
                /* ANDROID CENTER FIX */
                div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                }
            </style>
        </head>
        
        <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="#FFA73B" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="http://localhost:3000/activation/${user._id}/${user.process.activationOTP}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                </td>
                            </tr> <!-- COPY -->
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">http://localhost:3000/activation/${user._id}/${user.process.activationOTP}</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Cheers,<br>BBB Team</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                    <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
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

class Home {
    static postRegister = (req, res) => {
        if (req.body.userType == 'student') {
            register(req, res, studentModel)
        } else if (req.body.userType == 'teacher') {
            register(req, res, teacherModel)
        }
    }

    static postLogin = (req, res) => {
        if (req.body.userType == 'student') {
            login(req, res, studentModel)
        } else if (req.body.userType == 'teacher') {
            login(req, res, teacherModel)
        }
    }

    static getActivationOTP = async (req, res) => {
        if (req.params.id.startsWith('T')) {
            activationOTP(req, res, teacherModel)
        } else if (req.params.id.startsWith('S')) {
            activationOTP(req, res, studentModel)
        }
    }

    static postResetPassword = async (req, res) => {
        try {
            let email = req.body.email
            let user = await studentModel.findOne({ email })
            if (!user) return resData(res, 200, true, '', 'this email does not found')
            if (user.process.resetPasswordTime > Date.now()) return resData(req, 200, true, '', 'the link already sent before, try again later')
            user.process.resetPasswordOTP = otpGenerator.generate(12, "")
            user.process.resetPasswordTime = Date.now() + (15 * 60 * 1000)
            await user.save()
            let link = `http://localhost:3000/resetPassword/${user._id}/${user.process.resetPasswordOTP}`
            resData(res, 200, true, `${user.email}`, 'Link has been Send Successfuly to Email')
        } catch (e) {
            resData(res, 500, false, e.message, 'Error in handling process try again later')
        }
    }

    static postResetPasswordForm = async (req, res) => {
        try {
            let _id = req.params.id
            let resetPasswordOTP = req.params.resetPasswordOTP
            let password = req.body.password
            let user = await studentModel.findOne({ _id, 'process.resetPasswordOTP': resetPasswordOTP })
            if (!user) return resData(res, 200, true, '', 'this link is not valid')
            if (user.process.resetPasswordTime < Date.now()) resData(res, 200, true, '', 'this link expired')
            let hashPassword = await bcryptjs.hash(password, +process.env.PASSWORDHASH)
            user.password = hashPassword;
            await user.save()
        } catch (e) {
            resData(res, 500, false, e.message, 'Error in handling process try again later')
        }
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





















