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
    name: Joi.string()
    .min(2)
    .max(40)
    .required(),
    image: Joi.string()
    .required(),
    description: Joi.string()
    .max(15000)
    .required(),
    phone: Joi.string()
    .required(),
    address: Joi.string()
    .required(),
    welcomeText: Joi.string()
    .max(500)
    .required(),
    facebookUrl: Joi.string(),
    instagramUrl: Joi.string(),
    linkedinUrl: Joi.string()
  });


  const editValidation = async (datos) =>{
    try {
        const value = await editOng.validateAsync(datos);
        console.log(value);
    } catch (error) {
       // console.log(error.message);
        throw new errors.IncompleteData('Faltan datos');
    }
}

const editOng = Joi.object({
    name: Joi.string()
    .min(2)
    .max(40)
    .required(),
    image: Joi.string()
  });


  module.exports={
      editValidation
  }