const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const fs = require('fs')
const path = require('path')

const users=fs.readFileSync(path.join(__dirname,"../data/userData.json"))


exports.generateAccessToken=(userId)=>{
    const accesstoken=jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10m'})
    return accesstoken
}
exports.generateRefreshToken=(userId)=>{
    const refreshtoken=jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
    return refreshtoken
}
exports.verifyRefreshToken=(token)=>{
    try{
    const verifiedToken=jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
    return verifiedToken}
    catch(err){
        return nullexports}}
exports.authenticateUser=(email,password)=>{
    // const user=users.find(userInfo=>userInfo.email===email)
    const user=users.find(userInfo=>userInfo.email===email && userInfo.password===password)
//    if(!user)
//    return res.status(401).send("Invalid username or password")
//    if(user.role!="admin")
//    return res.status(403).send("Unauthorized User")
   return user

}