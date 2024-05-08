const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { log } = require('console')
const { send } = require('process')
const { json } = require('body-parser')
const createError = require('http-errors')
require('dotenv').config()

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/userData.json')),
)

exports.generateAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' }, (err, token) => {
      if (err) {
        reject(createError.InternalServerError())
        return
      }
      return resolve(token)
    })

  })
}
exports.generateRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d', }, (err, token) => {
      if (err) {
        reject(createError.InternalServerError())
        return
      }
      return resolve(token)
    })
  })
}
exports.verifyRefreshToken = (token) => {
  try {
    const verifiedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    return verifiedToken.userId
  } catch (err) {
    console.log(err.message)
    return null
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

