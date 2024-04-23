const express = require('express')
const app = express();
const session = require('express-session')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const fs= require('fs')
const path = require('path')

app.use('/user', userRoute)
app.use('/admin', adminRoute)
app.use(express.static("public"))
app.use(express.json())
app.use(session({ secret: "tobin", 
                    resave: true, 
                        saveUninitialized: true }))
app.use(express.urlencoded({ extended: true }))
app.get('*', (req, res) => {
    res.status(404).send("404 not found")
})
app.listen(3001, () => {
    console.log("Connection to local host");
})

