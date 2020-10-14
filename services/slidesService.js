const errors = require('../errors/errors');
const slideSchema  = require('../joivalidation/slides');
const db = require("../models");
const { uploadFile } = require('./awsService');
const { validateImage } = require('../util/validateImage');
const slideAll = async () => {
  try {
   return await db.Slides.findAll();
   //console.log(slides)
  } catch (error) {
    console.log(error);
  }
};

// const createSlide = async (req, res) => {
  
//     try {
//       const result = await slideSchema.validateAsync(req.body);
//       const slide = await db.Slides.create(result) 
//       res.json({message:'el slide fue creado', slide});
          
          
//     } catch (error) {
//       res.status(error.statusCode || 500).send({message: 'No se ha podido realizar su peticion'});
//     }
//   };
const create = async (data, fileprops, userId) => {
  let result, statusCode;
  try {
    await slideSchema(data);
    validateImage(fileprops);
    const fileUploaded = await uploadFile(
      userId,
      fileprops.originalname,
      fileprops.buffer
    );
    data.contentType = 'slide';
    data.image = fileUploaded.Location;
    const newSlide = await db.Slides.create(data);
    result = parseSlide(newSlide);
    statusCode = 201;
  } catch (error) {
    result = { message: error.message };
    statusCode = error.statusCode || 500;
  }
  return {
    result,
    statusCode
  };
};

const parseSlide = (content) => {
  return {
    bienvenida: content.bienvenida,
    text: content.text,
    image: content.image,
    order: content.order,
  };
};


  const updateSlide = async (req, res) => {
  
    try {
      const result = await slideSchema.validateAsync(req.body);
      const slide = await db.Slides.update(result, {
        where: {
          id : req.params.id
        }
      }) 
      res.json({message:'el slide fue actualizado'});
          
          
    } catch (error) {
      res.status(error.statusCode || 500).send({message: 'No se ha podido realizar su peticion'});
    }
  };

  
  

module.exports = { slideAll, updateSlide, create };