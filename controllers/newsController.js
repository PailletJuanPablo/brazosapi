const multer = require('multer')
const newsService = require('../services/newsService')
const db = require('../models/index');



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



const getById= async (req,res) =>{
      //res.json(req.params);
      const oneNews = await newsService.findById(req.params);
      res.status(oneNews.statusCode).json(oneNews.result);
    }


const updateById= async (req,res) =>{
    //res.json(req.body);
    //res.json(req.params);
    const update = await newsService.updateNews(req.params,req.body);
    res.status(update.statusCode).json(update.result);
  }


module.exports = {
   uploadNews,
    getById,
    updateById
};