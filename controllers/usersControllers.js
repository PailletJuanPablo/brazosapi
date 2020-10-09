const db = require("../models/index");
const userService = require("../services/userService");
const {verifyJWT} = require('../util/jwt');




 const  create = async (req,res) =>{
        const newUser = await userService.crateUser(req.body);
        res.status(newUser.statusCode).json(newUser.result);
    }


const deleteAccount = async(req, res) => {
    try {
      
      const token = req.headers.authorization.split(' ')[1];
      if(!token) return res.send('No hay token');
      const {user} = verifyJWT(token);
      if(user != req.params.id) return res.send('Hubo un error');

      const deleteResult= await userService.softDelete(req.params.id);
      res.status(deleteResult.statusCode).json(deleteResult.result);

    } catch (error) {
      console.log(error);
    }
    
};

module.exports = {
  create,
  deleteAccount,
};
