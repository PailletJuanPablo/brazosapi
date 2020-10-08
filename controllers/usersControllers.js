const db = require('../models/index');
const userService = require('../services/userService')

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
    try {
        const userUpdated = await userService.updates(req.params.id, req.body);
        if (!userUpdated) {
            res.status(400).json({error: 'No cumple con los requisitos'})
        } else {
            res.status(200).json(userUpdated); 
        }           
    } catch (error) {
        res.status(500).json({error: 'Server Error'})
    }    
}

module.exports = {
    create,
    getOne,
    update
}