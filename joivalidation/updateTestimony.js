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
    name: Joi.string(),
    content: Joi.string().max(15000)
})