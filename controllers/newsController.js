const multer = require('multer');
const newsService = require('../services/newsService');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fields: 4,
    fileSize: 60000000,
    files: 1,
    parts: 5
  }
});
const db = require('../models/index');


const uploadNews = (req, res) => {
  upload.single('media')(req, res, async (err) => {
    //ToDo:
    const news = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category
    };
    //2. Descomentar y comentar cuando agreguen el middleware requireLogin a la ruta(antes que este asi le mete el req.user)
    userId = 1;
    // const userId = req.user.userId
    const result = await newsService.create(news, req.file, userId);
    res.status(result.statusCode).json(result.result);
  });
};

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
      return res.status(200).json({ message: 'No news found.' });
    }
    return res.json({ message: 'OK', news });
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
};

const updateById = async (req, res) => {
  //res.json(req.body);
  //res.json(req.params);
  const update = await newsService.updateNews(req);
  res.status(update.statusCode).json(update.result);
}


module.exports = {
  getById,
  getAll,
  uploadNews,
  updateById
};
