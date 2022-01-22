const router = require('express').Router()
const homeController = require('../app/controller/home.controller')

router.post('/register', homeController.postRegister)
router.post('/login', homeController.postLogin)
router.get('/activation/:id/:activationOTP', homeController.getActivationOTP)

module.exports = router