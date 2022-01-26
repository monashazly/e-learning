const router = require('express').Router()
const homeController = require('../app/controller/home.controller')
const logoutAuth = require('../middleware/loout.auth')

router.post('/register', homeController.postRegister)
router.post('/login', homeController.postLogin)
router.get('/activation/:id/:activationOTP', homeController.getActivationOTP)
router.post('/resetPassword', homeController.postResetPassword)
router.post('/resetPassword/:id/:resetPasswordOTP', homeController.postResetPasswordForm)
router.get('/logout', logoutAuth, homeController.getLogout)



module.exports = router