const express = require('express')
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan')

const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors')
const adminRoutes = require('./routes/adminRoute')
const userRoutes = require('./routes/userRoutes')
const supervisorRoute = require('./routes/superRoutes ')
require('dotenv').config()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)
app.use('/api/supervisor', supervisorRoute)

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodejsProject',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes*.js'],
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use((req, res, next) => {
  next(createError.NotFound('This route doesnt exist'))
})
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Connection to local host' http://localhost:${process.env.PORT}`)
})
