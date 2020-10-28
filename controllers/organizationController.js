const {getOrganization} = require('../services/organizationService');
const organizationService = require('../services/organizationService');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fields: 4,
    fileSize: 60000000,
    files: 1,
    parts: 5
  }
});


const public = async(req, res) => {
  const resultado = await getOrganization();
  res.status(resultado.statusCode).json(resultado.organizations);
}

const updateById = async (req, res) => {

  const isAdmin = req.user.roleId;
  if(isAdmin !== 1) return res.status(403).json({message:'Permiso no valido'});

  upload.single('media')(req, res, async (err) => {
    const { id } = req.params;
    const {name} =req.body;
    const ong ={name};
    const userId = req.user.userId;

    if(!req.file){
      const ongEdited = await organizationService.updateOrg(id,ong,userId);
      res.status(ongEdited.statusCode).json(ongEdited.result);
      return;
    }

    const ongEdited = await organizationService.updateOrg(id,ong,userId,req.file);
    res.status(ongEdited.statusCode).json(ongEdited.result);

  })
}

module.exports = {
  public,
  updateById
}