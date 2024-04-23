const express=require('express')
const router=express.Router();
const path=require('path')


router.get('/',(req,res)=>{
    // res.send("Welcome to Admin Login")
    res.sendFile(path.join(__dirname,'../public/loginAdmin.html'))
 })
 router.post('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/adminHome.html'))
 })
 module.exports=router