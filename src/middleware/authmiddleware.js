const jwt = require("jsonwebtoken")
const { login } = require("../controllers/admin")
const createError = require('http-errors')
require('dotenv').config
exports.verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization'])
        return next(createError.BadRequest("No Authorization"))
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    if (!token) {
        return next(createError.Unauthorized())
    }
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return next(createError.Unauthorized())
            }
            console.log(JSON.stringify(payload));
            next()
        })
    } catch (error) {
        res.status(401).json({ messsage: "Invalid Token" })

    }
}

exports.authorize = (allowedRole) => {
    return (req, res, next) => {
        const user = req.user
        console.log(user+"user");
        if (user && user.role === allowedRole)
            next()
        else 
        {
            return next(createError.Unauthorized())
        }
        }
}