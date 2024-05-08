const fs = require('fs')
const path = require('path')
const createError=require('http-errors')
const {
  generateAccessToken,
  generateRefreshToken,
  authenticateUser,
  verifyRefreshToken,
  ValidUser
} = require('../helpers/jwt')
const {loginCheckSchema}=require("../helpers/validation-schema")
const { log } = require('console')

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/userData.json')),
)

exports.loginGet = async (req, res) => {
  console.log('Entered login')
  res.status(200).send(`You are now Login page , now you can login`)
}

exports.loginPost = async (req, res,next) => {
  try {
    console.log('Entered login Posts')
    const { email, password } = req.body
    const UserDetails = authenticateUser(email, password)
    if (!UserDetails) 
      return res.status(401).send('Invalid email or password')
    console.log(UserDetails.email+"userDetails");
      const user = loginCheckSchema.validateAsync(req.body)
    // const user = loginCheckSchema.validateAsync(UserDetails)
    console.log(user+"user");
    if (!user) 
      return res.status(401).send('Enter the email & password properly')

       const accessToken = await generateAccessToken(UserDetails.id)
      console.log(accessToken);
       const refresherToken= await generateRefreshToken(UserDetails.id)
       console.log(refresherToken+"refresherToken")
       res.status(200).send({accessToken,refresherToken})

  } catch(error) {
    if(error.isJoi===true) {
      return next(createError.BadRequest('Invalid Username/Password'))
    }
    next(error)
  }
}
exports.home = async (req, res) => {
  res.status(200).send('Welcome to the Home page')
}

// exports.forgotPassword=async(req,res,next)=>{
//   try {
//     const{email,password,confirmPassword }=req.body
//     const user=ValidUser(email)
//     console.log((user.password)+"hai");
//     if(!user)
//     return res.status(401).send('Invalid email')

//     if(password!==confirmPassword)
//     return res.status(401).send('Passwords do not match')
//     console.log(user.password+"user.password")

//     user.password=password

//     console.log(user.password+"user.password")
//     fs.writeFileSync(
//     path.join(__dirname, '../data/userData.json'),JSON.stringify(user, null, 2),
//   )
//   // res.send({user})
//     // res.status(200).send({message:'Password changed successfully',users:users})
//     res
//       .status(200)
//       .send({message:'User data successfully updated ' ,users:users})


//   } catch (error) {
//     return next(createError.BadRequest("Error changing the password"))
//   }
// }
exports.forgotPassword= async (req, res) => {
  const userId = req.params.id
  const {email,password,confirmPassword}=req.body
  console.log(email);
  console.log(password+'password')
  console.log(userId);
  try {
    const userIndex = users.findIndex((user) => user.id === userId)
    console.log(userIndex+"hai");
    if (userIndex === -1) return res.status(404).send('Invalid user')

      if(password!==confirmPassword)
            return res.status(401).send('Passwords do not match')
      console.log(password+"pass");
      console.log(users[userIndex].password);
    if (req.body.password) users[userIndex].password = req.body.password
    console.log(users[userIndex].password+"like");
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