const errors = require("../errors/errors");
const { uploadFile, deleteFile } = require("./awsService");
const newsJoiValidation = require("../joivalidation/entryNews");
const { validateImage } = require("../util/validateImage");
const updateNewsValidation = require("../joivalidation/updateNews");
const db = require("../models");

const findById = async (date) => {
  let result, statusCode;

  try {
    //Revisar que exista
    const { id } = date;
    const getOneNews = await db.Entry.findOne({
      where: { id: id },
    });

    if (!getOneNews) {
      throw new errors.NotExistNews("NO EXISTE UNA NOTICIA CON ESE ID");
    }

    result = getOneNews;
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
    data.contentType = "news";
    data.image = fileUploaded.Location;
    const newNews = await db.Entry.create(data);
    result = parseNew(newNews);
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
      where: {
        contentType: "news",
      },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "title", "createdAt"],
    });
  } catch (error) {
    console.log(error);
  }
};

const updateNews = async (date) => {
  let result, statusCode;

  try {
    let validation = await updateNewsValidation(date.body);
    console.log(validation);
    const { id } = date.params;
    const getOneNews = await db.Entry.findOne({
      where: { id: id },
    });
    console.log(25);

    if (!getOneNews) {
      throw new errors.NotExistNews("NO EXISTE UNA NOTICIA CON ESE ID");
    }

    result = await db.Entry.update(date.body, {
      where: { id: id },
    });
    statusCode = 200;
  } catch (error) {
    result = { msg: error.message };
    statusCode = error.statusCode || 500;
  }
  return {
    result,
    statusCode,
  };
};

const deleteNews = async (id) => {
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
    const news = await db.Entry.findByPk(id);
    if(!news) throw new errors.NotExistNews("NO EXISTE UNA NOTICIA CON ESE ID");
    const base = 'https://alkemy-ong.s3.amazonaws.com/';
    const {image} = news;
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

    const updatedNews = await db.Entry.findByPk(id);
    result=updatedNews;
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

module.exports = { create, findAll, findById, updateNews, deleteNews, edit };
