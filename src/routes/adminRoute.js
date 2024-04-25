// const express=require('express')
// const router=express.Router();
// const path=require('path')
// const fs=require('fs');
// const bodyParser=require('body-parser')

// router.use(bodyParser.urlencoded({extended:true}))
// const userDataPath=path.join(__dirname,"../data/userData.json")
// const users=JSON.parse(fs.readFileSync(userDataPath,'utf8'))

// router.get('/',(req,res)=>{
//     res.send("Welcome to Admin Login Page")
//    //  res.sendFile(path.join(__dirname,'../public/loginAdmin.html'))
//  })
//  router.post('/',(req,res)=>{
//    const{email,password}=req.body
//    const user=users.find(userInfo=>userInfo.email===email && userInfo.password===password)

//    if(!user)
//    return res.status(401).send("Invalid username or password")

//    if(user.role!="admin")
//    return res.status(403).send("Unauthorized User")

//    res.redirect("/admin/home")
//   //  res.sendFile(path.join(__dirname,"../public/adminHome.html"))   
//  })

//  router.get('/home',(req, res) => {
//    return res.status(200).send("Welcome to Admin Home Page ")
//  })
//  module.exports=router