const express = require('express')
const morgan = require('morgan')
const app = express()
const session = require('express-session')
const adminRoutes = require('./routes/adminRoute')
const userRoutes = require('./routes/userRoutes')
const createError = require('http-errors')
require('dotenv').config()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/admin', adminRoutes)
app.use('/user', userRoutes)

app.use((req, res, next) => {
next(createError.NotFound("This route doesnt exist"))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
      error: {
        status:err.status|| 500,
        message: err.message,
      },
    })
  })

app.listen(process.env.PORT, () => {
  console.log(`Connection to local host' http://localhost:${process.env.PORT}`)
})
