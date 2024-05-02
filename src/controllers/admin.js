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
  res.status(200).send(`You are now Admin Login page , now you can login`)
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = authenticateUser(email, password)
    if (!user) return res.status(401).send('Invalid email or password')

    if (user.role !== 'admin') return res.status(403).send('Unauthorized User')
    const accessToken = generateAccessToken(user.id)
    console.log(accessToken + ' created')
    //    const refresherToken=generateRefreshToken(user.id)
    console.log('Hello')
    // res.json({accessToken,refresherToken})
    res.redirect('/admin/home')
    // res.status(200).send("Successfully signed in");
  } catch {
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
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.editUsers = async (req, res) => {
  try {
    const userId = req.params.id
    const userIndex = users.findIndex(user => user.id === userId)
    if (userIndex==-1) return res.status(404).send('Invalid user')
    if(req.body.name)
    users[userIndex].name=req.body.name
    if(req.body.number)
    users[userIndex].name=req.body.number
    if(req.body.role)
    users[userIndex].name=req.body.role
    if(req.body.email)
    users[userIndex].name=req.body.email
    if(req.body.password)
    users[userIndex].name=req.body.password
    
    fs.writeFileSync('userData.json',JSON.stringify(users,null,2))
    const userDetails=users[userIndex]
    res.status(200).send("User data successfully updated"+userDetails.name +userDetails.email)
  } catch (error) {
    res.status(500).send(error)
    
  }
}