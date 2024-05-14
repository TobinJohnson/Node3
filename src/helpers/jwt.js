const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { log } = require('console')
const { send } = require('process')
const { json } = require('body-parser')
// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors')
require('dotenv').config()

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/userData.json')),
)

exports.generateAccessToken = (userId) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      { userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '20m' },
      (err, token) => {
        if (err) {
          reject(createError.InternalServerError())
          return
        }
        return resolve(token)
      },
    )
  })
exports.generateRefreshToken = (userId) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          reject(createError.InternalServerError())
          return
        }
        return resolve(token)
      },
    )
  })
exports.verifyRefreshToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization
  const token = tokenHeader.split(' ')[1]
  console.log(token + 'token')
  try {
    console.log(process.env.REFRESH_TOKEN_SECRET + 'helo')
    const verifiedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    req.user = verifiedToken
    console.log('hai' + req.user)
    next()
    // return verifiedToken.userId
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ message: 'Invalid Token' })
  }
}
exports.authenticateUser = (email, password) => {
  try {
    const user = users.find(
      (userInfo) => userInfo.email === email && userInfo.password === password,
    )

    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
exports.ValidUser = (email) => {
  try {
    const user = users.find((userInfo) => userInfo.email === email)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
exports.generateUniqueId = () => {
  const unique = Date.now().toString()
  return unique
}
