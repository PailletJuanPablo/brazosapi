const db = require('../models');
const { getUserId } = require('../helpers/getUserId');

const getUser = async (req, res) => {
	try {
		console.log(req.headers.authorization)
		if (!req.headers.authorization) {
			res.status(400).send('Please provide Token');
		}
		const userId = getUserId(req);
		const user = await db.User.findByPk(userId);
		if (user === null) {
			res.status(404).send('User not found');
		}
		res.send({ user });
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getUser };
