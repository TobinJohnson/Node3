const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/userData.json')),
)

exports.generateAccessToken = (userId) => {
  try {
    console.log(jwt.sign + 'jwt generated')
    // const accesstoken=jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10m'})
    console.log(userId + 'haihai')
    // const accesstoken=jwt.sign({'data':'12312'},"hello",{expiresIn:'10m'})
    const accessToken = jwt.sign({})

    // return accesstoken
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
    return verifiedToken
  } catch (err) {
    return null
  }
}
exports.authenticateUser = (email, password) => {
  const user = users.find(
    (userInfo) => userInfo.email === email && userInfo.password === password,
  )
  return user
}
