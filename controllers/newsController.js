const multer = require('multer')
const {createNewNews} = require('../services/newsService')

const storage = multer.memoryStorage()
  const upload = multer({
    storage: storage,
    limits: {
      fields:1,
      fileSize: 60000000,
      files: 1,
      parts: 2
    }
  })
const uploadNews = (req, res) => {
  upload.single('media')(req, res, async (err) => { 
    //ToDo:
    //1. Buscar manera de mandar o sacar la informacion del request
    const news = JSON.parse(req.body.news)
    //2. Descomentar y comentar cuando agreguen el middleware requireLogin a la ruta(antes que este asi le mete el req.user)
    userId = 1
    // const userId = req.user.userId
    const result = await createNewNews(news, req.file, userId)
    res.status(result.statusCode).json(result.result)
  })
}

module.exports = {uploadNews}