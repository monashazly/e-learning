const mongoose = require("mongoose");
const subjectModel=require("./subject.model");
const teacherModel=require("./teacher.model")
const teacherSubjectSchema = new mongoose.Schema({
    teacher:{type: mongoose.Schema.Types.ObjectId,ref:"teacher"},
    subject:{type: mongoose.Schema.Types.ObjectId,ref:"subject"}
})
const teacherSubject=mongoose.model("teacherSubject", teacherSubjectSchema)
module.exports = teacherSubject