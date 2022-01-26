const mongoose = require("mongoose")
const validator = require('validator')
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const adminSchema = new mongoose.Schema({
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
    token: { type: String },
},
    { timestamps: true }
)
// return user 
adminSchema.methods.toJSON = function () {
    let user = this.toObject();

    delete user.password

    return user
}
// adminLogIn
adminSchema.statics.loginAdmin = async (email, password) => {
    const admin = await adminModel.findOne({ email })
    if (!admin) throw new Error("invalid admin email")
    const isValid = await bcryptjs.compare(password, admin.password)
    if (!isValid) throw new Error("invalid password")
    return admin
}
// genarate token
adminSchema.methods.generateToken = async function () {
    let user = this
    user.token = "A" + await jwt.sign({ _id: user._id }, process.env.TOKENHASHSECRET)
    await user.save()
    return user.token
}

const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel