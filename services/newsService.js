const {uploadFile} = require('./awsService')
const db = require('../models')
const newsJoiValidation = require('../joivalidation/entryNews')
const {validateImage} = require('../util/validateImage')

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



module.exports = {createNewNews, findNews}
