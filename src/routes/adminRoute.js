/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const app=express()

const multer = require('multer')

const router = express.Router()

const adminController = require('../controllers/admin')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '/upload')
  },
})
const upload = multer({ storage })

router.get('/login', adminController.loginGet)
router.post('/login', adminController.login)
router.get('/home', adminController.home)
router.get('/home/viewUsers', adminController.viewUsers)
router.post('/refreshtoken', adminController.refresherToken)
router.post('/user/addUser', adminController.addUser)
router.put('/user/:id', adminController.editUsers)
router.put('/user/:id/changePassword', adminController.changePassword)
router.delete('/user/:id', adminController.userDelete)
router.post(
  'user/uploadPic',
  upload.single('./user/upload/Tj.jpg'),
  adminController.PhotoUpload,
)

module.exports = router
