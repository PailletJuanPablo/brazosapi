const multer = require('multer');
const testimonyService = require('../services/testimonyService');
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



const uploadTestimony = (req, res) => {
    upload.single('media')(req, res, async (err) => {
      //ToDo:
      const testimony = {
        name: req.body.name,
        content: req.body.content
      };
      //console.log(req.file);
      //2. Descomentar y comentar cuando agreguen el middleware requireLogin a la ruta(antes que este asi le mete el req.user)
      organizationId = 1;
      // const userId = req.user.userId
      const result = await testimonyService.create(testimony, req.file, organizationId);
      res.status(result.statusCode).json(result.result);
    });
  };

  const editById = async (req,res) =>{
    upload.single('media')(req, res, async (err) => {
      const testimony = {
        name: req.body.name,
        content: req.body.content
      };   

      organizationId=1
     
      if(!req.file){
        const editedTestimony = await testimonyService.edit(req.params.id,testimony,organizationId);
        console.log(editedTestimony)
        res.status(editedTestimony.statusCode).json(editedTestimony.result);
        return;
      }
      const editedTestimony = await testimonyService.edit(id,testimony,organizationId,req.file);
      res.status(editedTestimony.statusCode).json(editedTestimony.result);      
    }); 
}


  
module.exports = {
    uploadTestimony,
    editById
};
  