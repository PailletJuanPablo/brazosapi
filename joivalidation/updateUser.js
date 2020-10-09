const Joi = require('joi');
const errors = require('../errors/errors');

module.exports = async (body) => {
    try {
        const value = await schema.validateAsync(body);
        console.log(value);
    } catch (error) {
        throw new errors.ExpectationFailed('No cumple con los requisitos')
    }
}

const schema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(20),
    lastName: Joi.string()
        .min(2)
        .max(20)
});