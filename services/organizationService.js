const db = require('../models/')

const getOrganization = async () => {
  let organizations
  let statusCode
  try {
    
    const resultado = await db.Organization.findOne({
      where: {
        id: 1
      }
    })
    organizations = parsearOrganizacionPublica(resultado)
    statusCode = 200
  } catch (error) {
    organizations = {message: error.message || 'Internal Server Error'}
    statusCode = error.statusCode || 500
  }
  return {organizations, statusCode}
}

function parsearOrganizacionPublica(organizacion) {
  return {
    name: organizacion.name,
    image: organizacion.image,
    phone: organizacion.phone,
    address: organizacion.address
  }
}

module.exports = {getOrganization}