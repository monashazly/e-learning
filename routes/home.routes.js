const router = require('express').Router()
const homeController = require('../app/controller/home.controller')

router.post('/login', homeController.postLogin)
// router.get('/logout')


module.exports = router