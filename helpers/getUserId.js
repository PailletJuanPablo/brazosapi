const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const getUserId = (request) => {
	const token = request.headers.authorization.split(' ')[1];
	const payload = jwt.verify(token, secret);
	console.log(payload)
	return payload.user;
};

module.exports = { getUserId };
