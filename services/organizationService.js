const db = require('../models/')

const getOrganization = async () => {
  let organizations
  let statusCode
  try {
    
    const result = await get()
    organizations = parsePublicOrganization(result)
    statusCode = 200
  } catch (error) {
    organizations = {message: error.message || 'Internal Server Error'}
    statusCode = error.statusCode || 500
  }
  return {organizations, statusCode}
}
const get = async () => {
  try {
    return await db.Organization.findOne({
      where: {
        id: 1
      }
    })
  } catch(error)
  {
    throw {message: 'hay algun error'}
  }
}

function parsePublicOrganization(organization) {
  return {
    name: organization.name,
    image: organization.image,
    phone: organization.phone,
    address: organization.address,
    welcomeText: organization.welcomeText,
    description: organization.description,
    facebookUrl: organization.facebookUrl,
    instagramUrl: organization.instagramUrl,
    linkedinUrl: organization.linkedinUrl
  }
}

module.exports = {getOrganization, get}