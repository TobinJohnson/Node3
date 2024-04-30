// const express=require('express')
// const router=express.Router()
// const path=require('path')
// const ejs=require('ejs')
// const session=require('express-session')
// const bodyParser=require('body-parser')
// // const userData=app.use(bodyParser.json())
// const fs=require('fs')

// router.use(bodyParser.urlencoded({extended:true}))
// const userDataPath=path.join(__dirname,"../data/userData.json")
// const users=JSON.parse(fs.readFileSync(userDataPath,'utf8'))
// router.use(session({
//    secret: 'your-secret-key',
//    resave: true,
//    saveUninitialized: true
// }));
// router.get('/',(req,res)=>{
//    //  res.send("Welcome to User Login")
//    if(req.session.user)
//       res.redirect('/user/home')
//    else
//    //  res.sendFile(path.join(__dirname,"../public/login.html"))
//    res.render('login')
//  })

//  router.post('/',(req,res)=>{
//    const {email, password}=req.body
//    const user=users.find(userInfo=>userInfo.email===email && userInfo.password===password)
//    console.log(JSON.stringify(user)+"user");
//    if(user){
//       req.session.user=user
//       res.redirect('/user/home')
//    //  res.sendFile(path.join(__dirname,"../public/userHome.html"))
//       }
//       else{
//          res.redirect('/user')
//       }
// })

//  router.get('/home',(req,res)=>{
//    const user = req.session.user

//    if(user){
//       res.send(`Name:${user.name}
//       Email: ${user.email}
//       Role:${user.role}
//       Number: ${user.number}`)

//       // res.render('userHome',{name:user.name,email:user.email,role:user.role,number:user.number})

//  }

// });
//  module.exports=router
"use strict";