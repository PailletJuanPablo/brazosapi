const db = require('../models/index');
const userService = require('../services/userService')



 const  create = async (req,res) =>{
        const newUser = await userService.crateUser(req.body);
        res.status(newUser.statusCode).json(newUser.result);
    }


module.exports = {
    create
}