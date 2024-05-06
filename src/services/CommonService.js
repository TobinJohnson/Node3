const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { log } = require('console')
require('dotenv').config()

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/userData.json')),
)

exports.generateAccessToken = (userId) => {
  try {
    const accesstoken=jwt.sign({id:userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10m'})
    return accesstoken
  } catch (err) {
    console.log('Error signing access token' + err.message)
    return null
  }
}
exports.generateRefreshToken = (userId) => {
  const refreshtoken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  })
  return refreshtoken
}
exports.verifyRefreshToken = (token) => {
  try {
    const verifiedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    console.log(verifiedToken+"verifiedToken")
    return verifiedToken.userId
  } catch (err) {
    console.log(err.message)
    return null
  }
}
exports.authenticateUser = (email, password) => {
  const user = users.find(
    (userInfo) => userInfo.email === email && userInfo.password === password,
  )
  return user
}

exports.generateUniqueId = () => {
  const unique = Date.now().toString()
  return unique
}
