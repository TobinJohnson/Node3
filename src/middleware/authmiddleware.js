const jwt = require('jsonwebtoken')
// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors')
const { login } = require('../controllers/admin')
// eslint-disable-next-line no-unused-expressions
require('dotenv').config

exports.verifyAccessToken = (req, res, next) => {
  if (!req.headers.authorization)
    return next(createError.BadRequest('No Authorization'))
  const authHeader = req.headers.authorization
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
      console.log(JSON.stringify(payload))
      next()
    })
  } catch (error) {
    res.status(401).json({ messsage: 'Invalid Token' })
  }
}

exports.authorize = (allowedRole) => (req, res, next) => {
  const { user } = req
  console.log(user + 'user')
  if (user && user.role === allowedRole) next()
  else {
    return next(createError.Unauthorized())
  }
}
