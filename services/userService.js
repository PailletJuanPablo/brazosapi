const db = require('../models');
const bcrypt = require('bcryptjs');
const userCreateValidation = require('../joivalidation/createUser');
const errors = require('../errors/errors');
const emailService = require('./mailService')

const crateUser = async (datos) => {
    let result, statusCode
    try {
        console.log(datos)
        await userCreateValidation(datos);
        const {firstName, lastName ,email, password} = datos;
        
        //Revisar que el usuario se unico
        const getUser = await db.User.findOne({
            where: {email: email}
        });
        
        if(getUser == null){
            let hash = await bcrypt.hash(`${password}`,10);
            const newUser = await db.User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash
            });
            result = {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            }
            emailService.sendWelcome(result, 'Brazos Abiertos')
           statusCode = 200;
        }else{
            throw new errors.ExistingEmail("Ya existe usuario con el mismo EMAIL");
        }
    } catch (error) {
        console.log(error)
        result = { msg : error.message}
        statusCode = error.statusCode;
    }
    return{
        result,
        statusCode
    }
}

module.exports = {
    crateUser
}