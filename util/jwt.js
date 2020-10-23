const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET =  process.env.LOGIN_SECRET
const EXPIRATION = "48h";

const generateJWT = (payload) => {
  return jwt.sign(payload, SECRET,{ algorithm: 'HS256', expiresIn: EXPIRATION })
} 

const verifyJWT = (token) => {
  return decoded = jwt.verify(token, SECRET)
}

module.exports = {generateJWT, verifyJWT}