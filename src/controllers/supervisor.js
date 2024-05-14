const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors')
require('dotenv').config()

app.use(bodyParser.json())
const isJoi = require('@hapi/joi')
const {
  generateAccessToken,
  generateRefreshToken,
  authenticateUser,
  verifyRefreshToken,
  generateUniqueId,
  // generateUniqueId,
} = require('../helpers/jwt')
const { loginCheckSchema } = require('../helpers/validation-schema')

app.use(express.json)
app.use(express.urlencoded({ extended: true }))

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/userData.json')),
)

exports.loginGet = async (req, res) => {
  res.status(200).send(`You are now Supervisor Login page , now you can login`)
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const UserDetails = authenticateUser(email, password)
    if (!UserDetails) return res.status(401).send('Invalid email or password')
    const user = loginCheckSchema.validateAsync(req.body)
    if (!user)
      return res.status(401).send('Enter the email & password properly')

    if (UserDetails.role !== 'supervisor')
      return res.status(403).send('Unauthorized User')
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

exports.verifyRefreshToken = async (req, res, next) => {
  try {
    const { refresherToken } = req.body
    if (!refresherToken) throw createError.BadRequest('Provide refrsher token')
    const userId = await verifyRefreshToken(refresherToken)
    if (!userId) throw createError.BadRequest('Provide correct refresher token')

    const accesstoken = await generateAccessToken(userId)
    const refreshTokenNew = await generateRefreshToken(userId)
    res.send({ accesstoken, refreshTokenNew })
  } catch (error) {
    next(error)
  }
}
exports.selfDetails = async (req, res, next) => {
  try {
    const userId = req.headers.authorization.split(' ')[1]
    const request = jwt.verify(userId, process.env.REFRESH_TOKEN_SECRET)
    const UserDetails = users.find((user) => user.id === request.userId)
    if (!UserDetails) throw createError.NotFound('User not found')
    // const user = await users.findById(req.user.id)
    res.json(UserDetails)
    console.log('hai')
  } catch (error) {
    next(error)
  }
}

exports.home = async (req, res) => {
  res.status(200).send('Welcome to the Home page')
}

exports.viewUsers = async (req, res) => {
  try {
    const regUser = users.filter((user) => user.role !== 'admin')
    res.status(200).send(regUser)
  } catch (error) {
    res.status(500).send(error)
  }
}
exports.singleUserDetails = (req, res) => {
  try {
    const userId = req.params.id
    const userIndex = users.findIndex((user) => user.id === userId)
    if (userIndex === -1) return res.status(404).send('Invalid userssss')
    res.status(200).send(users[userIndex])
  } catch (error) {
    res.status(500).send(error)
  }
}
exports.editDetails = (req, res, next) => {
  try {
    const { name, number } = req.body
    if (!req.headers.authorization)
      return res.status(401).send('Unauthorized User')
    const userId = req.headers.authorization.split(' ')[1]
    const request = jwt.verify(userId, process.env.REFRESH_TOKEN_SECRET)
    const UserDetails = users.find((user) => user.id === request.userId)
    if (!UserDetails) throw createError.NotFound('User not found')
    const userIndex = users.findIndex((user) => user.id === request.userId)
    if (userIndex === -1) return res.status(404).send('Invalid user')
    users[userIndex].name = name
    users[userIndex].number = number
    fs.writeFileSync(
      path.join(__dirname, '../data/userData.json'),
      JSON.stringify(users, null, 2),
    )
    res
      .status(200)
      .send('User details updated' + JSON.stringify(users[userIndex]))
  } catch (error) {
    console.log(error)
    if (error.isJoi === true) {
      return next(createError.BadRequest('Invalid Username/Password'))
    }
  }
}
exports.addUser = (req, res) => {
  try {
    const { name, number, role, email, password } = req.body
    if (!name || !number || !role || !email || !password)
      return res.status(400).send('Please fill all the fields')
    const user = {
      // id: users.length + 1,
      id: generateUniqueId(),
      name,
      number,
      role,
      email,
      password,
    }
    users.push(user)
    fs.writeFileSync(
      path.join(__dirname, '../data/userData.json'),
      JSON.stringify(users, null, 2),
    )
    res
      .status(201)
      .send(
        'User added successfully and the new UserDetails is ' +
          JSON.stringify(user),
      )
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.editUsers = async (req, res) => {
  try {
    const userId = req.params.id
    const userIndex = users.findIndex((user) => user.id === userId)
    if (userIndex === -1) return res.status(404).send('Invalid user')
    if (req.body.name) users[userIndex].name = req.body.name
    if (req.body.number) users[userIndex].number = req.body.number
    if (req.body.role) users[userIndex].role = req.body.role
    if (req.body.email) users[userIndex].email = req.body.email
    if (req.body.password) users[userIndex].password = req.body.password

    fs.writeFileSync(
      path.join(__dirname, '../data/userData.json'),
      JSON.stringify(users, null, 2),
    )

    res.status(200).send({ message: 'User data successfully updated ', users })
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.changePassword = async (req, res) => {
  const userId = req.params.id
  console.log(userId)
  try {
    const userIndex = users.findIndex((user) => user.id === userId)
    if (userIndex === -1) return res.status(404).send('Invalid user')
    if (req.body.password) users[userIndex].password = req.body.password
    console.log(users[userIndex].password + 'like')
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
exports.passwordChange = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body
    console.log(password + 'password')
    if (password !== confirmPassword)
      res.status(400).send('Passwords do not match')
    if (!req.headers.authorization)
      return res.status(401).send('Unauthorized User')
    const userId = req.headers.authorization.split(' ')[1]
    const request = jwt.verify(userId, process.env.REFRESH_TOKEN_SECRET)

    const UserDetails = await users.find((user) => user.id === request.userId)
    if (!UserDetails) throw createError.NotFound('User not found')
    if (password.length < 6) {
      return res.status(400).json('Password must be at least 6 characters long')
    }

    const userIndex = users.findIndex((user) => user.id === request.userId)
    users[userIndex].password = password
    fs.writeFileSync(
      path.join(__dirname, '../data/userData.json'),
      JSON.stringify(users, null, 2),
    )
    res
      .status(200)
      .send('Password changed successfully' + JSON.stringify(UserDetails))
  } catch (error) {
    console.log(error)
    if (error.isJoi === true) {
      return createError.BadRequest('Invalid Username/Password')
    }
  }
}

exports.userDelete = async (req, res) => {
  const userId = req.params.id
  try {
    const userIndex = users.findIndex((user) => user.id === userId)
    if (userIndex === -1) return res.status(404).send('Invalid user')
    users.splice(userIndex, 1)
    fs.writeFileSync(
      path.join(__dirname, '../data/userData.json'),
      JSON.stringify(users, null, 2),
    )
    res
      .status(200)
      .send(
        'User successfully deleted and the updated users list is ' +
          JSON.stringify(users),
      )
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.PhotoUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('Photo not uploaded')
    res.status(200).send('Photo uploaded ')
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}
