const db = require('../models')
const jwt = require('../util/jwt')
const bcrypt = require('bcrypt')
const userLoginCredentialValidation = require('../joivalidation/login')
const errors = require('../errors/errors')
const SessionLoginService = async (credentials) => {
  let resultado, statusCode
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
    const result = await bcrypt.compare(credentials.password, user.password)
    if (!result) {
      throw new errors.InvalidCredentials('Credenciales invalidas')
    }
    const payload = {
      user: user.id,
      rolId: user.roleId
    }
    resultado = await {
      jwt: jwt.generateJWT(payload)
    } 
    statusCode = 201
  } catch (error) {
    resultado = {message: error.message}
    statusCode = error.statusCode || 500
  }
  return {
    resultado,
    statusCode
  }
}



module.exports = {SessionLoginService}