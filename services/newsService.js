const db = require('../models');

const findNews = async () => {
  try {
    return await db.Entry.findAll({
      where: {
        type: 'news'
      },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'createdAt']
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = findNews;
