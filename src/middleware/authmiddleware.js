const { configDotenv } = require("dotenv")
const jwt=require("jsonwebtoken")
const { login } = require("../controllers/admin")
const createError=require('http-errors')
require('dotenv').config
exports.verifyAccessToken=(req,res,next)=>{
    console.log(req.headers['authorization']+"hai")

    if(!req.headers['authorization'])
        return next(createError.BadRequest("No Authorization"))
    const authHeader=req.headers['authorization']
    console.log(authHeader+"authHeader");
    const bearerToken=authHeader.split(' ')
    const token=bearerToken[1]


    console.log(token+"token");
    if(!token){
        return next(createError.Unauthorized())
    }
    try {
        console.log("inside try");
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
           if(err){
            console.log(err+"err");
            return next(createError.Unauthorized())}
            console.log(JSON.stringify(payload));
        })
        console.log(payload);
    } catch (error) {
        res.status(401).json({messsage:"Invalid Token"})
        
    }
}