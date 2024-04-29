const express = require('express')
const app = express();
const session = require('express-session')
const adminRoutes=require('./routes/adminRoute')
const cors= require('cors')
app.use(cors())
require('dotenv').config();

app.use(session({ secret: "tobin", 
                    resave: true, 
                        saveUninitialized: true }))
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))
app.use(express.json())

app.use('/admin', adminRoutes)

app.get('*', (req, res) => {
    res.status(404).send("404 not found")
})
app.listen(process.env.PORT, () => {
    console.log("Connection to local host");
})

