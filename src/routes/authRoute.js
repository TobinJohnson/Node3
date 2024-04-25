const express= require('express')
const router= express.Router();
const authController=require('../controllers/authorization')

router.post('/login',authController.login)
router.post('/refreshtoken',authController.refresherToken)

module.exports=router;