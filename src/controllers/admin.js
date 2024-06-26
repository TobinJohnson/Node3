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
  res.status(200).send(`You are now Admin Login page , now you can login`)
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const UserDetails = authenticateUser(email, password)
    if (!UserDetails) return res.status(401).send('Invalid email or password')
    const user = loginCheckSchema.validateAsync(req.body)
    if (!user)
      return res.status(401).send('Enter the email & password properly')

    if (UserDetails.role !== 'admin')
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
    if (!refresherToken) throw createError.BadRequest('Provide refresher token')
    const userId = await verifyRefreshToken(refresherToken)
    console.log(refresherToken + 'refresher')

    if (!userId) throw createError.BadRequest('Provide correct refresher token')
    console.log(userId + 'user')
    const accesstoken = await generateAccessToken(userId)
    const refreshTokenNew = await generateRefreshToken(userId)
    res.send({ accesstoken, refreshTokenNew })
  } catch (error) {
    next(error)
  }
}

exports.home = async (req, res) => {
  res.status(200).send('Welcome to the Home page')
}

exports.viewUsers = async (req, res) => {
  try {
    // eslint-disable-next-line array-callback-return
    console.log('Hello')
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send(error)
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
