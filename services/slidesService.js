const errors = require('../errors/errors');
const _ = require('lodash');
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


const updateSlide = async (id, data, fileprops, userId) => {
  let result, statusCode;
  
  try {
    const slide = await db.Slides.findByPk(id);
    if(!slide) throw new errors.NotExistNews("No existe un slide con ese ID");

    await slideSchema(data);
    // console.log(id)
    // console.log(data)
    // console.log(fileprops)
    // console.log(userId)

    if (!_.isEmpty(fileprops) || !_.isUndefined(fileprops) ){
      //console.log('entro al if')
      validateImage(fileprops);
      const fileUploaded = await uploadFile(
        userId,
        fileprops.originalname,
        fileprops.buffer
      );
        data.image = fileUploaded.Location
        //console.log(data)
    } 

    data.contentType = 'slide';

    const newSlide = await db.Slides.update(data, {
      
      where: { id : id }
      
    });
    //console.log(newSlide)
    result = parseSlide(data);

    statusCode = 201;
  } catch (error) {
    //console.log(error.message)
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


  // const updateSlide = async (req, res) => {
  
  //   try {
  //     const result = await slideSchema.validateAsync(req.body);
  //     const slide = await db.Slides.update(result, {
  //       where: {
  //         id : req.params.id
  //       }
  //     }) 
  //     res.json({message:'el slide fue actualizado'});
          
          
  //   } catch (error) {
  //     res.status(error.statusCode || 500).send({message: 'No se ha podido realizar su peticion'});
  //   }
  // };



  
  

module.exports = { slideAll, updateSlide, create };