const express = require("express")
const app = express()

require("dotenv").config()
require("../models/dbconnection/dbconnection")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const StudentRoutes = require("../routes/student.routes")
const AdminRoutes = require("../routes/admin.routes")
const TeacherRoutes = require("../routes/teacher.routes")
const homeRoutes = require('../routes/home.routes')

app.use("/", homeRoutes)
app.use("/teacher", TeacherRoutes)
app.use("/admin", AdminRoutes)
app.use("/student", StudentRoutes)

module.exports = app
