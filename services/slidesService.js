const { slideSchema } = require('../joivalidation/slides');
const db = require("../models");
const slideAll = async () => {
  try {
   return await db.Slides.findAll();
   //console.log(slides)
  } catch (error) {
    console.log(error);
  }
};
const createSlide = async (req, res) => {
  
    try {
      const result = await slideSchema.validateAsync(req.body);
      const slide = await db.Slides.create(result) 
      res.json({message:'el slide fue creado', slide});
          
          
    } catch (error) {
      res.status(error.statusCode || 500).send({message: 'No se ha podido realizar su peticion'});
    }
  };

  const updateSlide = async (req, res) => {
  
    try {
      const result = await slideSchema.validateAsync(req.body);
      const slide = await db.Slides.update(result, {
        where: {
          id: 1
        }
      }) 
      res.json({message:'el slide fue actualizado', slide});
          
          
    } catch (error) {
      res.status(error.statusCode || 500).send({message: 'No se ha podido realizar su peticion'});
    }
  };

  
  

module.exports = { slideAll, createSlide, updateSlide };