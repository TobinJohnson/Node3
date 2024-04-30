const express = require('express')

const app = express()
const session = require('express-session')
const adminRoutes = require('./routes/adminRoute')
const userRoutes = require('./routes/userRoutes')
// const cors = require('cors')

// app.use(cors())
// const eslint = require('eslint')

// const cli = new eslint.CLIEngine()
// const result = cli.executeOnText('')

require('dotenv').config()

app.use(session({ secret: 'tobin', resave: true, saveUninitialized: true }))
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(express.json())

app.use('/admin', adminRoutes)
app.use('/user', userRoutes)

app.get('*', (req, res) => {
  res.status(404).send('404 not found')
})
app.listen(process.env.PORT, () => {
  console.log('Connection to local host')
})
