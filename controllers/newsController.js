const newsService = require('../services/newsService');
const db = require('../models/index');

const getById = async (req, res) => {
  try {
    const oneNews = await newsService.findById(req.params);
    return res.status(200).json(oneNews.result);
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const news = await newsService.findAll();
    if (!news.length) {
      return res.status(200).json({ message: 'No news found.', news: [] });
    }
    return res.json({ message: 'OK', news });
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
};

module.exports = {
  getById,
  getAll
};
