const {generateAccessToken,generateRefreshToken,authenticateUser, verifyRefreshToken}=require('../services/AuthService')

exports.LoginGet=async(req,res)=>{
    
}

exports.login=async(req,res)=>{
    const {email,password} = req.body   
    const user=await authenticateUser(email,password)
    if(!user)
        return res.status(401).send('Invalid email or password')

        const accessToken=generateAccessToken(user.id)
        const refresherToken=generateRefreshToken(user.id)
        res.json({accessToken,refresherToken})
    
}

exports.refresherToken=async(req,res) => {
    const {refresherToken}=req.body
    const userId=verifyRefreshToken(refresherToken)
    if(!userId)
        return res.status(401).send('Invalid refresher token')
    const accessToken=generateAccessToken(userId)
    res.json({accessToken:accessToken})
}

