const nodemailer = require('nodemailer');

const sendEmail = (email, subject, content) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASSWORD, // generated ethereal password
        },
    });

    let emilOptions = {
        from: process.env.EMAIL,
        to: email,
        subject,
        html: content
    }

    transporter.sendMail(emilOptions, (err, info) => {
        if (err) console.log(err)
        else console.log(info)
    })
}

module.exports = sendEmail