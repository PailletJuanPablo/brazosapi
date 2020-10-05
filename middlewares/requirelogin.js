const jwt = require('../util/jwt').verifyJWT
const _ = require('lodash')
const errors = require('../errors/errors')

//Recordar que el token se compone por 2 partes, el cliente debe agregar "bearer " + jwt
// bearer djknjfndfn.iduhui34u5hhi.djhbfdb
async function requireLogin(req, res, next) {
  const header = req.headers
  const token = header.authorization
  try {
    if (_.isUndefined(token)) {
      throw new errors.RequireLogin('Necesitas estar Logeado')
    }
    const payload = jwt(token.split(' ')[1])
    const user = {
      userId: payload.userId,
      roleId: payload.roleId
    }
    req.user = user
    next()
  } catch (error) {
    res.status(error.statusCode || 406).json({message:  error.message || 'No tenes permisos para acceder a este recurso'})
  }
}

module.exports = requireLogin