const {uploadFile} = require('./awsService');
const db = require('../models');
const newsJoiValidation = require('../joivalidation/entryNews');
const {validateImage} = require('../util/validateImage');
const updateNewsValidation = require('../joivalidation/updateNews');
const errors = require('../errors/errors');

const createNewNews = async (data, fileprops, userId) => {
  let result, statusCode
  try {
    await newsJoiValidation(data)
    validateImage(fileprops)
    const fileUploaded = await uploadFile(userId, fileprops.originalname, fileprops.buffer)
    data.contentType = 'news'
    data.image = fileUploaded.Location
    const newNews = await db.Entry.create(data)
    result = parseNewNews(newNews)
    statusCode = 201
  } catch(error) {
    result = {message: error.message}
    statusCode = error.statusCode || 500
  }
  return {
    result,
    statusCode
  }
}

const parseNewNews = (content) => {
  return {
    title: content.title,
    content: content.content,
    image: content.image,
    category: content.category,
    contentType: content.contentType,
    createdAt: content.createdAt
  }
}

const findNews = async () => {
  try {
    return await db.Entry.findAll({
      where: {
        contentType: 'news'
      },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'createdAt']
    });
  } catch (error) {
    console.log(error);
  }
};


const findById = async (date) => {
  let result, statusCode
 
  try {
      //Revisar que exista
      const {id} = date;
      const getOneNews = await db.Entry.findOne({
          where: {id: id}
      });

      if(!getOneNews){
        throw new errors.NotExistNews("NO EXISTE UNA NOTICIA CON ESE ID");
      }
      
      result = getOneNews;
      statusCode = 200;
  } catch (error) {
      result = { msg : error.message}
      statusCode = error.statusCode;
  }
  return{
      result,
      statusCode
  }
}

const updateNews = async (date) =>{
  let result, statusCode

  try {
    await updateNewsValidation(date.body);

    const {id} = date.params;
    const getOneNews = await db.Entry.findOne({
      where: {id: id}
    });
    console.log(25);

    if(!getOneNews){
      throw new errors.NotExistNews("NO EXISTE UNA NOTICIA CON ESE ID");
    }

    result = await db.Entry.update(date.body, {
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



module.exports = {createNewNews, findNews, findById, updateNews}
