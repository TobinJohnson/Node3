const Joi = require('@hapi/joi')

const loginCheckSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
})

module.exports = {
  loginCheckSchema,
}
