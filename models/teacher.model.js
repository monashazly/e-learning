const mongoose = require("mongoose");
const validator = require('validator')
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const teacherSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     default: () => 'T' + new mongoose.Types.ObjectId()
    // },
    name: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
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
        }
    },
    activationOTP: {
        type: String
    },
    activationOTPStatus: { type: Boolean, default: false },
    activationAdmin: {
        type: Boolean,
        default: false
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ],
    blocked: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)
teacherSchema.pre("save", async function () {
    const user = this
    if (user.isModified("password"))
        user.password = await bcryptjs.hash(user.password, 12)
})

teacherSchema.methods.toJSON = function () {
    let teacher = this.toObject()
    delete teacher.password
    delete teacher.__v
    delete teacher.tokens
    return teacher
}
teacherSchema.statics.login = async function (Email, password) {
    const teacher = await Teacher.findOne({ Email })
    console.log(teacher)
    if (!teacher) throw new Error("not a user")

    const isCorrect = await bcryptjs.compare(password, teacher.password)
    if (!isCorrect) throw new Error("password not valid")
    return teacher

}
teacherSchema.methods.generateToken = async function () {
    const teacher = this
    const token = await jwt.sign({ _id: teacher._id, type: 'teacher' }, process.env.TOKENHASHSECRET)
    return token
}

const Teacher = mongoose.model("teacher", teacherSchema)

module.exports = Teacher