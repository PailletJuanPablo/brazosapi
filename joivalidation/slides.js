const _ = require('lodash')
const Joi = require('joi');
const errors = require('../errors/errors')
module.exports = async (credentials) => {
  if (_.isEmpty(credentials)) {
    throw new errors.BadRequest('No se han ingresado datos')
  }
  try {
    const value = await schema.validateAsync(credentials)
    console.log(value)
  } catch(error) {
    console.log(error.message)
    throw new errors.BadRequest('Informacion incorrecta')
  }
}

const schema = Joi.object({
  bienvenida: Joi.string().min(4).required(),
  text: Joi.string(),
  order: Joi.string().alphanum().required()

})

// const slideSchema = Joi.object({
//   bienvenida: Joi.string().min(4),
//   text: Joi.string().min(4),
//   //image: Joi.string().min(4),
//   order: Joi.number(),
// })

// module.exports = {
//   slideSchema,
// }