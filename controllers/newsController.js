const db = require('../models/index');
const newsServices = require('../services/newsServices')


module.exports = {
    getNewsForId: async (req,res) =>{
        const oneNews = await newsServices.findNewsForId(req.body);
        res.status(oneNews.statusCode).json(oneNews.result);
    }
}