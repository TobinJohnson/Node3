const express=require('express')
const router=express.Router()
const path=require('path')
const bodyParser=require('body-parser')
const userData=app.use(bodyParser.json())

router.get('/',(req,res)=>{
    // res.send("Welcome to User Login")
    res.sendFile(path.join(__dirname,"../public/login.html"))
 })

 router.post('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/userHome.html"))
 })
 module.exports=router