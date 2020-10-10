const db = require('../models/');
const errors = require('../errors/errors');
const updateOrganizationValidation = require('../joivalidation/updateOrganizationValidation');

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
        id: 3
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

const updateOrg = async (date) =>{
  let result
  let statusCode

  try {
    await updateOrganizationValidation(date.body);
    const {id} = date.params;
    const getOrg = await db.Organization.findOne({
      where: {id: id}
    });

    if(!getOrg){
      throw new errors.NotExistOrganization("NO EXISTE UNA ORGANIZACIÓN CON ESE ID");
    }
    result = await db.Organization.update(date.body, {
    where: { id: id}
    });
    
    statusCode = 200;
  } catch (error) {
    result = { msg : error.message}
    statusCode = error.statusCode || 500;
  }
  return{
    result,
    statusCode
  }

}

module.exports = {
  getOrganization,
  updateOrg,
  get
}
