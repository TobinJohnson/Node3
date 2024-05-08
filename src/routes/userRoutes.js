const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const authMiddle = require('../middleware/authmiddleware')

router.get('/login', userController.loginGet)
router.post('/login', userController.loginPost)
router.get('/home', authMiddle.verifyAccessToken, userController.home)
router.post('/forgotPassword/:id', userController.forgotPassword)
// router.post('/refreshtoken', userController.refresherToken)

module.exports = router
