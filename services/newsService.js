const errors = require("../errors/errors");
const db = require("../models");

const findById = async (date) => {
  let result, statusCode;

  try {
    //Revisar que exista
    const { id } = date;
    const getOneNews = await db.Entry.findOne({
      where: { id: id },
    });
    if (!getOneNews) {
      throw new errors.NotExistNews("NO EXISTE UNA NOTICIA CON ESE ID");
    }
    result = getOneNews;
    statusCode = 200;
  } catch (error) {
    result = { msg: error.message };
    statusCode = error.statusCode;
  }
  return {
    result,
    statusCode,
  };
};

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

// const edit = async (id,data,userId, fileprops = null) => {
//   let result, statusCode;
//   try {
//     const news = await db.Entry.findByPk(id);
//     if(!news) throw new errors.NotExistNews("NO EXISTE UNA NOTICIA CON ESE ID");
//     const base = 'https://alkemy-ong.s3.amazonaws.com/';
//     const {image} = news;
//     const url = image.slice(base.length)    
//     await newsJoiValidation(data);
//     if(fileprops === null){
//       console.log('No hay archivo');
//       await db.Entry.update(data,{
//         where:{
//           id
//         }
//       });
//     }else{
//       await deleteFile(url)
//       console.log('imagen eliminada de aws');
//       validateImage(fileprops);
//       const fileUploaded = await uploadFile(
//         userId,
//         fileprops.originalname,
//         fileprops.buffer
//       );
//       data.image = fileUploaded.Location;
//       await db.Entry.update(data,{
//         where:{
//           id
//         }
//       });
//     }
//     const updatedNews = await db.Entry.findByPk(id);
//     result=updatedNews;
//     statusCode=200;    
//   } catch (error) {
//     console.log(error);
//     result = { msg: error.message };
//     statusCode = error.statusCode;
//   }
//   return {
//     result,
//     statusCode,
//   };
// };

module.exports = { findAll, findById };
