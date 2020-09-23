const db = require('../models/index');
const userService = require('../services/userService')
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

module.exports = {
    createUserController: async (req,res) =>{

        const newUser = await userService.crateUser(req.body);
        res.status(newUser.statusCode).json(newUser.result);
    }
}
/*
//Crear nuevo usuario
exports.crateUser = async (req, res) => {
    //revisar si hay errores
    const errors = validationResult(req);

    if(!errors.isEmpty()){ // si hay errores los muestro
        console.log('Hay un error de validacion de campos');
        return res.status(400).json({ errors: errors.array() })
    }

    try {     
        const {firstName, lastName ,email, password} = req.body;

        //Revisar que el usuario se unico
        const getUser = await db.User.findOne({
            where: {email: email}
        });
        //console.log(getUser);
       
        if(getUser == null){

            let hash = await bcryptjs.hash(`${password}`,10);
            //console.log(hash);
            const newUser = await db.User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                //password: hash,
                password: hash
            });

            res.status(200).json(newUser);
            
        }else{
            res.status(404).json({ msg: 'Ya existe usuario con el mismo EMAIL'});
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error);
    }
}
¨*/