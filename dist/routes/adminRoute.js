"use strict";

var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin');
router.get('/login', adminController.loginGet);
router.post('/login', adminController.login);
router.get('/home', adminController.home);
router.get('/home/viewUsers', adminController.viewUsers);
router.post('/refreshtoken', adminController.refresherToken);
module.exports = router;