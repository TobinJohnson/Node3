const { configDotenv } = require("dotenv")
const jwt=require("jsonwebtoken")
require('dotenv').config
exports.authenticate=(req,res,next)=>{
    const token=req.header('Authorization')
    if(!token){
        return res.status(401).json({messsage:'Not authorized'})
    }
    try {
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.user=decoded
        next();
    } catch (error) {
        res.status(401).json({messsage:"Invalid Token"})
        
    }
}