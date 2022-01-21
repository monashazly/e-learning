const mongoose = require("mongoose");
const validator = require('validator')
const bcryptjs = require("bcryptjs");
const teacherSchema = new mongoose.Schema({
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
    active: {
        type: Boolean,
        default: false
    },
    courses: [
        {
            course: { type: mongoose.Schema.Types.ObjectId }
        }
    ],
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
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

const Teacher = mongoose.model("Pendings", teacherSchema)

module.exports = Teacher