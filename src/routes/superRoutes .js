const express = require('express')
const {
  verifyRefreshToken,
  // generateUniqueId,
  // } = require('../helpers/jwt')
} = require('../controllers/admin')

const app = express()
const router = express.Router()
const supervisorController = require('../controllers/supervisor')
const authMiddle = require('../middleware/authmiddleware')

app.use(authMiddle.authorize)
router.get('/users', supervisorController.viewUsers)
router.get('/login', supervisorController.loginGet)
// router.get('/users/:id', supervisorController.singleUserDetails)
router.get('/users/me', supervisorController.selfDetails)
router.post('/login', supervisorController.login)
router.patch('/users/me', supervisorController.editDetails)
router.patch('/users/me/password', supervisorController.passwordChange)

// router.get('/home', authMiddle.verifyAccessToken, supervisorController.home)
// router.post('/forgot-password/:id', supervisorController.forgotPassword)
// router.post('/refreshtoken', userController.refresherToken)

module.exports = router
