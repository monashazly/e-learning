const mongoose = require("mongoose")
const validator = require("validator")
const bycryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("invalid email format")
        },

    },
    password: {
        type: String,
        minlength: 7,
        trim: true,
        required: true
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subject' }

    ],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    process: {
        activationOTP: { type: String },
        activationOTPStatus: { type: Boolean, default: false },
        blocked: { type: Boolean, default: false },
        resetPasswordOTP: { type: String },
        resetPasswordTime: { type: Number }
    },

}, { tiemstamps: true })
// Custom student data return 
studentSchema.methods.toJSON = function () {
    let user = this.toObject()
    delete user.tokens
    delete user.password
    delete user.activationOTPStatus
    delete user.activationOTP
    delete user.__v
    return user
}
//passwordhash
studentSchema.pre("save", async function () {
    const student = this
    if (student.isModified("password"))
        student.password = await bycryptjs.hash(student.password, parseInt(process.env.PASSWORDHASH))

})
//login function
studentSchema.statics.login = async function (email, password) {
    const student = await Student.findOne({ email })
    if (!student) throw new Error("not a user")
    const isCorrect = await bycryptjs.compare(password, student.password)
    if (!isCorrect) throw new Error("password not valid")
    return student
}
//generate token
studentSchema.methods.GenerateToken = async function () {
    const student = this
    const token = "S" + await jwt.sign({ _id: student._id, type: 'student' }, process.env.TOKENHASHSECRET)
    return token
}
const Student = mongoose.model("Student", studentSchema)
module.exports = Student
