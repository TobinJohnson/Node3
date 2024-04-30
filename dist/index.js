"use strict";

var express = require('express');
var app = express();
var session = require('express-session');
var adminRoutes = require('./routes/adminRoute');
var cors = require('cors');
app.use(cors());
require('dotenv').config();
app.use(session({
  secret: "tobin",
  resave: true,
  saveUninitialized: true
}));
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"]("public"));
app.use(express.json());
app.use('/admin', adminRoutes);
app.get('*', function (req, res) {
  res.status(404).send("404 not found");
});
app.listen(process.env.PORT, function () {
  console.log("Connection to local host");
});