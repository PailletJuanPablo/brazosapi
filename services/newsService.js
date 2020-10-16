const errors = require("../errors/errors");
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

const findAll = async () => {
  try {
    return await db.Entry.findAll({
      where: {
        contentType: "news",
      },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'createdAt', 'content', 'image']
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { findAll, findById };