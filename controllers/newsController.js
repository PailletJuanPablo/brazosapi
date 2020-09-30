const multer = require('multer')
const {createNewNews} = require('../services/newsService')
const db = require('../models/index');
const newsServices = require('../services/newsServices')

const storage = multer.memoryStorage()
  const upload = multer({
    storage: storage,
    limits: {
      fields: 4,
      fileSize: 60000000,
      files: 1,
      parts: 5
    }
  })

const uploadNews = (req, res) => {
  upload.single('media')(req, res, async (err) => { 
    //ToDo:
    const news = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category
    }
    //2. Descomentar y comentar cuando agreguen el middleware requireLogin a la ruta(antes que este asi le mete el req.user)
    userId = 1
    // const userId = req.user.userId
    const result = await createNewNews(news, req.file, userId)
    res.status(result.statusCode).json(result.result)
  })
}

const getNewsForId = async (req,res) =>{
  try {
    const oneNews = await newsServices.findNewsForId(req.params);
    return res.status(oneNews.statusCode).json(oneNews.result);
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
};

const getAllNews = async (req, res) => {
  try {
    const news = await newsServices.findNews();
    if (!news.length) {
      return res.status(200).json({ message: 'No news found.' });
    }
    return res.json({ message: 'OK', news });
  } catch (error) {
    return res.status(500).send({ message: 'Server error' })
  }
 
};


module.exports = {
    getNewsForId,
    uploadNews,
    getAllNews
}
