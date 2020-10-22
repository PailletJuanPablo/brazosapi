const db = require('../models/');
const errors = require('../errors/errors');
const updateOrganizationValidation = require('../joivalidation/updateOrganizationValidation');
const { uploadFile, deleteFile } = require("./awsService");
const { validateImage } = require("../util/validateImage");

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
        id: 1 //mantener en 1
      }
    });
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

const updateOrg = async (id,data,userId, fileprops = null) =>{
  let result
  let statusCode

  try {
    //obtener ong a editar
    const ong = await db.Organization.findByPk(id)
    if(!ong) throw new errors.NotExistOrganization("NO EXISTE UNA ORGANIZACIÓN CON ESE ID");

    const base = 'https://alkemy-ong.s3.amazonaws.com/';
    const {image} = ong;
    const url = image.slice(base.length)
    await updateOrganizationValidation.editValidation(data);
    if(fileprops === null){
      console.log('No hay archivo');
      await db.Organization.update(data,{
        where:{id:id}
      })

    }else{
      await deleteFile(url);
      console.log('imagen eliminada de aws');
      validateImage(fileprops);
      const fileUploaded = await uploadFile(
        userId,
        fileprops.originalname,
        fileprops.buffer
      );
      data.image = fileUploaded.Location;

      await db.Organization.update(data,{
        where:{ id:id}
      })
    }
    const ongUpdated = await db.Organization.findByPk(id);
    
    result= ongUpdated;
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
