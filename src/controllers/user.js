const fs = require('fs')
const path = require('path')
const {
  generateAccessToken,
  generateRefreshToken,
  authenticateUser,
  verifyRefreshToken,
} = require('../services/CommonService')

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/userData.json')),
)

exports.loginGet = async (req, res) => {
  res.status(200).send(`You are now Login page , now you can login`)
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = authenticateUser(email, password)
    if (!user) return res.status(401).send('Invalid email or password')
  } catch {
    res.status(500).send('Something went wrong')
  }
}
exports.home = async (req, res) => {
  res.status(200).send('Welcome to the Home page')
}