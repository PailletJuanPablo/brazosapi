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

// const editById = async (req,res) =>{
//     upload.single('media')(req, res, async (err) => {
//       const {id} = req.params;
//       const {title,content,category} = req.body;
//       const news={title,content,category};      
//       userId=1
//       if(!req.file){
//         const editedNews = await newsService.edit(id,news,userId);
//         res.status(editedNews.statusCode).json(editedNews.result);
//         return;
//       }
//       const editedNews = await newsService.edit(id,news,userId,req.file);
//       res.status(editedNews.statusCode).json(editedNews.result);      
//     }); 
// }

module.exports = {
  getById,
  getAll
};
