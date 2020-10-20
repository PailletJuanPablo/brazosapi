const db = require('../models/');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const getUser = async (email) => {
  try {
    const user = await db.User.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Could not get to database.');;
  }
};

const createToken = async (email) => {
  try {
    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
    await db.User.update(
      { recovery_password_token: token },
      { where: { email } }
    );
    return token;
  } catch (error) {
    console.log(error);
    throw new Error('Token not created.')
  }
};

module.exports = { getUser, createToken };
