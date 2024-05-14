const fs = require('fs')
const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors')
const { log } = require('console')
const {
  generateAccessToken,
  generateRefreshToken,
  authenticateUser,
  verifyRefreshToken,
  ValidUser,
} = require('../helpers/jwt')
const { loginCheckSchema } = require('../helpers/validation-schema')

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/userData.json')),
)

exports.loginGet = async (req, res) => {
  console.log('Entered login')
  res.status(200).send(`You are now Login page , now you can login`)
}

exports.loginPost = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const UserDetails = authenticateUser(email, password)
    if (!UserDetails) return res.status(401).send('Invalid email or password')
    const user = await loginCheckSchema.validateAsync(req.body)
    if (!user)
      return res.status(401).send('Enter the email & password properly')

    const accessToken = await generateAccessToken(UserDetails.id)
    const refresherToken = await generateRefreshToken(UserDetails.id)
    res.status(200).send({ accessToken, refresherToken })
  } catch (error) {
    if (error.isJoi === true) {
      return next(createError.BadRequest('Invalid Username/Password'))
    }
    next(error)
  }
}
exports.home = async (req, res) => {
  res.status(200).send('Welcome to the Home page')
}

exports.forgotPassword = async (req, res) => {
  const userId = req.params.id
  const { email, password, confirmPassword } = req.body
  try {
    const userIndex = users.findIndex((user) => user.id === userId)
    if (userIndex === -1) return res.status(404).send('Invalid user')

    if (password !== confirmPassword)
      return res.status(401).send('Passwords do not match')

    if (req.body.password) users[userIndex].password = req.body.password
    fs.writeFileSync(
      path.join(__dirname, '../data/userData.json'),
      JSON.stringify(users, null, 2),
    )
    res
      .status(200)
      .send('User data successfully updated ' + JSON.stringify(users))
  } catch (error) {
    res.status(500).send(error)
  }
}
