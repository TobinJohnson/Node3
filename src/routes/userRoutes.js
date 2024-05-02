const express = require('express')

const router = express.Router()
const userController = require('../controllers/user')

router.get('/login', userController.loginGet)
router.post('/login', userController.loginPost)
router.get('/home', userController.home)
// router.post('/refreshtoken', userController.refresherToken)

module.exports = router
