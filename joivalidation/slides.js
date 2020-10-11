const Joi = require('joi');

const slideSchema = Joi.object({
  bienvenida: Joi.string().min(4),
  text: Joi.string().min(4),
  image: Joi.string().min(4),
})

module.exports = {
  slideSchema,
}