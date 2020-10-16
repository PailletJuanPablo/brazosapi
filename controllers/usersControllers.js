const db = require("../models/index");
const userService = require("../services/userService");
const { verifyJWT } = require('../util/jwt');


const create = async (req, res) => {
  const newUser = await userService.crateUser(req.body);
  res.status(newUser.statusCode).json(newUser.result);
}

const getOne = async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: 'No se ha pedido bien el recurso' })
  }
}

const update = async (req, res) => {
  console.log(req.user)
  try {
    const userUpdated = await userService.updates(req.user.userId, req.body);
<<<<<<< HEAD
    console.log(userUpdated)
=======
>>>>>>> 2e3499ef8dffba730be4d0df92c2d0ef6599589b
    if (!userUpdated) {
      res.status(400).json({ error: 'No cumple con los requisitos' })
    } else {
      res.status(200).json(userUpdated);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' })
  }
}

const deleteAccount = async (req, res) => {
  try {
    console.log('Hola!')
    const deleteResult = await userService.softDelete(req.user.userId);
    res.status(deleteResult.statusCode).json(deleteResult.result);

  } catch (error) {
    console.log(error);
  }

};

module.exports = {
  create,
  deleteAccount,
  getOne,
  update
};
