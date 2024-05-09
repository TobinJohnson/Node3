/* eslint-disable import/no-extraneous-dependencies */
const express = require('express')
const app = express()
const paths = require('path')
const multer = require('multer')
const router = express.Router()
const adminController = require('../controllers/admin')
const authMiddle = require('../middleware/authmiddleware')


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + paths.extname(file.originalname))

  }
})
const upload = multer({ storage })
app.use(authMiddle.authorize)
/**
 *@swagger
 * /api/admin/login:
 *   get:
 *     summary: Login
 *     description:This is api
 *     responses:
 *            200:
 *              description:To test get method
 * 
 */

router.get('/login', adminController.loginGet)
router.post('/login', adminController.login)
router.get('/home', authMiddle.verifyAccessToken, adminController.home)
router.get('/home/users', adminController.viewUsers)
router.post('/verify-refresh-token', adminController.verifyRefreshToken)
router.post('/user/new-user', adminController.addUser)
router.put('/user/:id', adminController.editUsers)
router.put('/user/change-password/:id', adminController.changePassword)
router.delete('/user/:id', adminController.userDelete)
router.post(
  '/user/upload',
  // upload.single('../upload/Tj.jpg'),
  upload.single('file'),
  adminController.PhotoUpload
)

module.exports = router
