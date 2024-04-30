"use strict";

var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
require('dotenv').config();
var users = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/userData.json")));
exports.generateAccessToken = function (userId) {
  try {
    console.log(jwt.sign + "jwt generated");
    // const accesstoken=jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10m'})
    console.log(userId + "haihai");
    // const accesstoken=jwt.sign({'data':'12312'},"hello",{expiresIn:'10m'})
    var accessToken = jwt.sign({});
    return accesstoken;
  } catch (err) {
    console.log("Error signing access token" + err.message);
    return null;
  }
};
exports.generateRefreshToken = function (userId) {
  var refreshtoken = jwt.sign({
    userId: userId
  }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d'
  });
  return refreshtoken;
};
exports.verifyRefreshToken = function (token) {
  try {
    var verifiedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return verifiedToken;
  } catch (err) {
    return nullexports;
  }
};
exports.authenticateUser = function (email, password) {
  var user = users.find(function (userInfo) {
    return userInfo.email === email && userInfo.password === password;
  });
  return user;
};