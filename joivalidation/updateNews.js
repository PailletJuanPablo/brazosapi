const Joi = require('joi');
const errors = require('../errors/errors');


module.exports = async (datos) =>{
    try {
        const value = await schema.validateAsync(datos);
        console.log(value);
    } catch (error) {
       // console.log(error.message);
        throw new errors.IncompleteData('Faltan datos');
    }
}


const schema = Joi.object({
    title: Joi.string()
    .min(2)
    .max(20)
    .required(),
    content: Joi.string().max(15000)
          .required(),
    image: Joi.string()
    .required(),
    contentType: Joi.string()
    .required(),
    category: Joi.string().alphanum().required()
  });
