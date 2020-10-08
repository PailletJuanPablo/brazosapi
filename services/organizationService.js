const db = require('../models/')

const getOrganization = async () => {
  let organizations
  let statusCode
  try {
    
    const result = await db.Organization.findOne({
      where: {
        id: 1
      }
    })
    organizations = parsePublicOrganization(result)
    statusCode = 200
  } catch (error) {
    organizations = {message: error.message || 'Internal Server Error'}
    statusCode = error.statusCode || 500
  }
  return {organizations, statusCode}
}

function parsePublicOrganization(organization) {
  return {
    name: organization.name,
    image: organization.image,
    phone: organization.phone,
    address: organization.address,
    welcomeText: organization.welcomeText
  }
}

module.exports = {getOrganization}