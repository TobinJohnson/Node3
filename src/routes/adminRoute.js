const express = require('express')

const router = express.Router()
const adminController = require('../controllers/admin')

router.get('/login', adminController.loginGet)
router.post('/login', adminController.login)
router.get('/home', adminController.home)
router.get('/home/viewUsers', adminController.viewUsers)
router.post('/refreshtoken', adminController.refresherToken)
router.put('/user/:id', adminController.editUsers)

module.exports = router
