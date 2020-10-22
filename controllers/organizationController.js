const {getOrganization} = require('../services/organizationService');
const organizationService = require('../services/organizationService');

const public = async(req, res) => {
  const resultado = await getOrganization();
  res.status(resultado.statusCode).json(resultado.organizations);
}

const updateById = async (req, res) => {
  const {id} =req.params;
  const {name, image} = req.body;
  
  let ong ={
    name,
    image
  }

  const update = await organizationService.updateOrg(id,ong)
  res.status(update.statusCode).json(update.result);
}

module.exports = {
  public,
  updateById
}