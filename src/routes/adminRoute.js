/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const app=express()
const paths=require('path')

const multer = require('multer')

const router = express.Router()

const adminController = require('../controllers/admin')
const authMiddle=require('../middleware/authmiddleware')
const { path } = require('@hapi/joi/lib/errors')
const { time } = require('console')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './upload')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+paths.extname(file.originalname))

  }
})
const upload = multer({ storage })

router.get('/login', adminController.loginGet)
router.post('/login', adminController.login)
router.get('/home', authMiddle.authenticate,adminController.home)
router.get('/home/viewUsers', adminController.viewUsers)
router.post('/refreshtoken', adminController.refresherToken)
router.post('/user/addUser', adminController.addUser)
router.put('/user/:id', adminController.editUsers)
router.put('/user/:id/changePassword', adminController.changePassword)
router.delete('/user/:id', adminController.userDelete)
router.post(
  '/user/uploadPic',
  // upload.single('../upload/Tj.jpg'),
  upload.single('file'),
  adminController.PhotoUpload
)

module.exports = router
