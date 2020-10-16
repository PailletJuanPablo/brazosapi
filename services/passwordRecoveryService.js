const db = require('../models/');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const getUser = async (email) => {
  const user = await db.User.findOne({ where: { email } });
  return user;
};

const createToken = async (email) => {
  const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
  await db.User.update(
    { recovery_password_token: token },
    { where: { email } }
  );
};

module.exports = { getUser, createToken };
