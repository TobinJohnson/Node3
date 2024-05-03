const fs = require('fs')
const path = require('path')
const { log, error } = require('console')
const express=require('express')
const app=express()
const {
  generateAccessToken,
  generateRefreshToken,
  authenticateUser,
  verifyRefreshToken,
  generateUniqueId,
  // generateUniqueId,
} = require('../services/CommonService')
const {loginCheckSchema}=require("../helpers/validation-schema")
const Joi = require('@hapi/joi')
app.use(express.json)
app.use(express.urlencoded({extended:true}))

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/userData.json')),
)

exports.loginGet = async (req, res) => {
  res.status(200).send(`You are now Admin Login page , now you can login`)
}

exports.login = (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body

    // const user = authenticateUser(email, password)
    // const user = await loginCheckSchema.validateAsync(req.body)
    // if (!user) return res.status(401).send('Invalid email or password')

    // if (user.role !== 'admin') return res.status(403).send('Unauthorized User')
    // const accessToken = generateAccessToken(user.id)
    // console.log(accessToken + ' created')
    //    const refresherToken=generateRefreshToken(user.id)
    console.log('Hello')
    // res.json({accessToken,refresherToken})
    // res.redirect('/admin/home')
    // res.status(200).send("Successfully signed in");
  } catch {
    if(error instanceof Joi.ValidationError){
      return res.status(400).json({error:{status:400,message:error.message}})
    }
    console.error(error)
    res.status(500).send('Something went wrong')
  }
}

exports.refresherToken = async (req, res) => {
  const { refresherToken } = req.body
  const userId = verifyRefreshToken(refresherToken)
  if (!userId) return res.status(401).send('Invalid refresher token')
  const accessToken = generateAccessToken(userId)
  res.json({ accessToken })
}

exports.home = async (req, res) => {
  res.status(200).send('Welcome to the Home page')
}

exports.viewUsers = async (req, res) => {
  try {
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
    if (req.body.number) users[userIndex].name = req.body.number
    if (req.body.role) users[userIndex].name = req.body.role
    if (req.body.email) users[userIndex].name = req.body.email
    if (req.body.password) users[userIndex].name = req.body.password

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

exports.changePassword = async (req, res) => {
  const userId = req.params.id
  try {
    const userIndex = users.findIndex((user) => user.id === userId)
    if (userIndex === -1) return res.status(404).send('Invalid user')
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
    if (!req.file) res.status(400).send('Photo not uploaded')
    res.status(200).send('You have successfully uploaded')
  } catch {
    res.status(500).send('Something went wrong')
  }
}
