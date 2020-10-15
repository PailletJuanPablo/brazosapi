const errors = require("../errors/errors");
const { uploadFile } = require("./awsService");
const testimonyJoiValidation = require("../joivalidation/updateTestimony");
const { validateImage } = require("../util/validateImage");
const db = require("../models");



const create = async (data, fileprops, organizationId) => {
    let result, statusCode;
    try {
      await testimonyJoiValidation(data);  // mi validacion
      console.log(fileprops)
      validateImage(fileprops);
      const fileUploaded = await uploadFile(
        organizationId,
        fileprops.originalname,
        fileprops.buffer
      );
      data.image = fileUploaded.Location;
      const newTestimony = await db.Testimony.create(data);
      result = parse(newTestimony);
      statusCode = 201;
    } catch (error) {
      result = { message: error.message };
      statusCode = error.statusCode || 500;
    }
    return {
      result,
      statusCode,
    };
  };

  const parse = (content) => {
    return {
        name: content.name,
        content: content.content,
        image: content.image,
        createdAt: content.createdAt
    };
  };

  const edit = async (id,data,organizationId, fileprops = null) => {
    let result, statusCode;
    try {
      const testimony = await db.Entry.findByPk(id);
      
        console.log(fileprops);

      if(!testimony){
        throw new errors.NotExistTestimony("NO EXISTE UN TESTIMONIO CON ESE ID");
      }

      const base = 'https://alkemy-ong.s3.amazonaws.com/';
      const {image} = testimony;

      const url = image.slice(base.length);

      await testimonyJoiValidation(data);

      if(fileprops === null){
        console.log('No hay archivo');
        await db.Testimony.update(data,{
          where:{
            id
          }
        });
      }else{
        await deleteFile(url);
        console.log('imagen eliminada de aws');
        validateImage(fileprops);
        const fileUploaded = await uploadFile(
            organizationId,
            fileprops.originalname,
            fileprops.buffer
        );
        data.image = fileUploaded.Location;
        await db.Testimony.update(data,{
          where:{
            id
          }
        });
      }
      const updatedTestimony = await db.Testimony.findByPk(id);

      result=updatedTestimony;
      statusCode=200;    
    } catch (error) {
     // console.log(error);
      result = { msg: error.message };
      statusCode = error.statusCode;
    }
    return {
      result,
      statusCode,
    };
  };



  module.exports = {
       create,
       edit
     };