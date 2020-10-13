const db = require('../models')
const jwt = require('../util/jwt')
const bcrypt = require('bcrypt')
const userLoginCredentialValidation = require('../joivalidation/login')
const errors = require('../errors/errors')

const SessionLoginService = async (credentials) => {
  let result, statusCode
  try {
    await userLoginCredentialValidation(credentials)
    const user = await db.User.findOne({
      where: {
        email: credentials.email
      }
    })
    if (user == null) {
      throw new errors.InvalidCredentials('Credenciales invalidas')
    }
    const isValid = await bcrypt.compare(credentials.password, user.password)
    if (!isValid) {
      throw new errors.InvalidCredentials('Credenciales invalidas')
    }
    const payload = {
      userId: user.id,
      roleId: user.roleId
    }
    result = await {
      jwt: jwt.generateJWT(payload)
    } 
    statusCode = 201
  } catch (error) {
    console.log(error.message);
    result = {message: error.message}
    statusCode = error.statusCode || 500
  }
  return {
    result,
    statusCode
  }
}



module.exports = {SessionLoginService}