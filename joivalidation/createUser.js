const Joi = require('joi');
const errors = require('../errors/errors')


module.exports = async (datos) =>{
    try {
        const value = await schema.validateAsync(datos);
        console.log(value);
    } catch (error) {
       // console.log(error.message);
        throw new errors.DatosIncompletos('Faltan datos');
    }
}


const schema = Joi.object({
    firstName: Joi.string()
    .min(2)
    .max(20)
    .required(),
    lastName: Joi.string()
    .min(2)
    .max(20)
    .required(),
    email: Joi.string()
    .min(6)
    .max(20)
    .required(),
    password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  })