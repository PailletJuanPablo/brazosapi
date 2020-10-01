const db = require('../models');
const errors = require('../errors/errors');
const { uploadFile } = require('./awsService');
const newsJoiValidation = require('../joivalidation/entryNews');
const { validateImage } = require('../util/validateImage');

const findById = async (date) => {
  let result, statusCode;

  try {
    const { id } = date;

    //Revisar que el usuario se unico
    const getOneNews = await db.Entry.findOne({
      where: { id: id }
    });

    if (getNews != null) {
      result = getOneNews;
      statusCode = 200;
    } else {
      throw new errors.NotExistNews('NO EXISTE UNA NOTICIA CON ESE ID');
    }
  } catch (error) {
    result = { msg: error.message };
    statusCode = error.statusCode;
  }
  return {
    result,
    statusCode
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
    data.contentType = 'news';
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
    statusCode
  };
};

const parseNew = (content) => {
  return {
    title: content.title,
    content: content.content,
    image: content.image,
    category: content.category,
    contentType: content.contentType,
    createdAt: content.createdAt
  };
};

const findAll = async () => {
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

module.exports = {
  findById,
  create,
  findAll
};
