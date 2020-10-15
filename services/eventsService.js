const errors = require("../errors/errors");
const db = require("../models");


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


module.exports = {findAll};