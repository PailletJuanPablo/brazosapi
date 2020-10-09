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
		console.log(user.dataValues)
		if (user === null) {
			throw new errors.NotFound('No se encuentra el usuario')
		}
		// hardcodeo el rol
		res.json({
			firstName: user.dataValues.firstName,
			lastName: user.dataValues.lastName,
			email: user.dataValues.email,
			rol: 'admin'
		});
	} catch (error) {
		console.log(error);
		res.stats(500).json({message: 'Internal server error'})
	}
};

module.exports = { getUser };
