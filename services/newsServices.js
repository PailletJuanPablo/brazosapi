const db = require('../models');
const errors = require('../errors/errors');

const findNewsForId = async (datos) => {
    let result, statusCode
   
    try {
        const {id} = datos;

        //Revisar que el usuario se unico
        const getOneNews = await db.Entry.findOne({
            where: {id: id}
        });

        if(getNews != null){
            result = getOneNews;
           statusCode = 200;
        }else{
            throw new errors.NotExistNews("NO EXISTE UNA NOTICIA CON ESE ID");
        }
    } catch (error) {
        result = { msg : error.message}
        statusCode = error.statusCode;
    }
    return{
        result,
        statusCode
    }
}

module.exports = {
    findNewsForId
}