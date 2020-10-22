const db = require('../models');
const { getUserId } = require('../helpers/getUserId');
const jwt = require('../util/jwt');
const errors = require('../errors/errors');
const getUser = async (req, res) => {
	try {
		console.log(req.user)
		
		const user = await db.User.findOne({
			where: {
				id: req.user.userId
			}
		});
		if (user === null) {
			throw new errors.NotFound('No se encuentra el usuario')
		}
		res.json({
			firstName: user.dataValues.firstName,
			lastName: user.dataValues.lastName,
			email: user.dataValues.email,
			//harcodeado 1 = user admin, arreglar con tabla roles
			roleId: user.dataValues.roleId
		});
	} catch (error) {
		console.log(error);
		res.status(error.statusCode || 500).json({message: 'Internal server error'})
	}
};

module.exports = { getUser };
