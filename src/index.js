const express = require('express')
const app = express();
const session = require('express-session')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const authRoutes=require('./routes/authRoute')
const fs= require('fs')
const path = require('path')
const jsontoken=require('jsonwebtoken')
const cors= require('cors')
const bcrypt=require("bcrypt")
app.use(cors())
require('dotenv').config();

app.use(session({ secret: "tobin", 
                    resave: true, 
                        saveUninitialized: true }))
app.use(express.urlencoded({ extended: true }))
// app.use('/user', userRoute)
// app.use('/admin', adminRoute)
app.use(express.static("public"))
app.use(express.json())

app.use('/auth', authRoutes)

app.get('*', (req, res) => {
    res.status(404).send("404 not found")
})
app.listen(process.env.PORT, () => {
    console.log("Connection to local host");
})

