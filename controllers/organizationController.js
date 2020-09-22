const {getOrganization} = require('../services/organizationService')

const public = async(req, res) => {
  const resultado = await getOrganization()
  res.status(resultado.statusCode).json(resultado.organizations)
}


module.exports = {public}