const errors = require("../errors/errors");
const { uploadFile, deleteFile } = require("./awsService");
const newsJoiValidation = require("../joivalidation/entryNews");
const { validateImage } = require("../util/validateImage");
const db = require("../models");

const findById = async (date) => {
  let result, statusCode;
  try {
    //Revisar que exista
    const { id } = date;
    const getOneEntry = await db.Entry.findOne({
      where: { id: id },
    });
    if (!getOneEntry) {
      throw new errors.NotExistNews("No existe una entrada con ese ID");
    }
    result = getOneEntry;
    statusCode = 200;
  } catch (error) {
    result = { msg: error.message };
    statusCode = error.statusCode;
  }
  return {
    result,
    statusCode,
  };
};

const create = async (data, fileprops, userId) => {
  let result, statusCode;
  try {
    await newsJoiValidation(data);
    validateImage(fileprops);
    const fileUploaded = await uploadFile(
      userId,
      fileprops.originalname,
      fileprops.buffer
    );
    if(data.category == 'Novedades') {
      data.contentType = 'news'
    } else {
      data.contentType = 'events'
    }    
    data.image = fileUploaded.Location;
    const newEntry = await db.Entry.create(data);
    result = parseNew(newEntry);
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

const parseNew = (content) => {
  return {
    title: content.title,
    content: content.content,
    image: content.image,
    category: content.category,
    contentType: content.contentType,
    createdAt: content.createdAt,
  };
};

const findAll = async () => {
  try {
    return await db.Entry.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'content', 'image', 'contentType', 'category', 'createdAt']
    });
  } catch (error) {
    console.log(error);
  }
};

const remove = async (id) => {
  try {
    let deletedEntry;
    const entry = await db.Entry.findByPk(id);
    if (!entry) {
      deletedEntry = null;
    } else {
      await db.Entry.destroy({
        where: {
          id,
        },
      });
      deletedEntry = entry;
    }
    return deletedEntry;
  } catch (error) {
    console.log(error);
  }
};

const edit = async (id,data,userId, fileprops = null) => {
  let result, statusCode;
  try {
    const entries = await db.Entry.findByPk(id);
    if(!entries) throw new errors.NotExistNews("No existe una entrada con ese ID");
    const base = 'https://alkemy-ong.s3.amazonaws.com/';
    const {image} = entries;
    const url = image.slice(base.length)    
    await newsJoiValidation(data);
    if(fileprops === null){
      console.log('No hay archivo');
      await db.Entry.update(data,{
        where:{
          id
        }
      });
    }else{
      await deleteFile(url)
      console.log('imagen eliminada de aws');
      validateImage(fileprops);
      const fileUploaded = await uploadFile(
        userId,
        fileprops.originalname,
        fileprops.buffer
      );
      data.image = fileUploaded.Location;
      await db.Entry.update(data,{
        where:{
          id
        }
      });
    }
    const updatedEntry = await db.Entry.findByPk(id);
    result=updatedEntry;
    statusCode=200;    
  } catch (error) {
    console.log(error);
    result = { msg: error.message };
    statusCode = error.statusCode;
  }
  return {
    result,
    statusCode,
  };
};

module.exports = { create, findAll, findById, remove, edit };
