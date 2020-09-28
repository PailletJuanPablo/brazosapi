const Joi = require('joi');

const contactShema = Joi.object({
  fullName: Joi.string().min(4).required(),
  phone: Joi.number(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).required()
})

module.exports = {
  contactShema,
}