const db = require('../models');
//const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const crateUser = async (datos) => {
    let result, statusCode
   
    try {     
        
        const {firstName, lastName ,email, password} = datos;

        //Revisar que el usuario se unico
        const getUser = await db.User.findOne({
            where: {email: email}
        });
        if(!firstName || !lastName || !email || !password){
            throw {
                statusCode: 400,
                msg: 'Hay un error de validacion de campos'
            }
        }

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
           statusCode = 200;
        }else{
            throw {
                statusCode: 404,
                msg: 'Ya existe usuario con el mismo EMAIL'
            }
        }
    } catch (error) {
        result = { msg : error.msg || 'No funciono el alta'}
        statusCode = error.statusCode || 400;
    }
    return{
        result,
        statusCode
    }
}

module.exports = {
    crateUser
}