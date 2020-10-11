const {slideAll, createSlide} = require('../services/slidesService')

const getAll = async (req, res) => {
  try {
    const slides = await slideAll(req, res);
    return res.json({ message: 'OK', slides });
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
};

const storeSlide = async (req, res) => {
  try {
    const resultado = await createSlide(req, res);
    // res.send('ok')
  } catch (error) {
    console.log(error)
  }
};


module.exports = {getAll, storeSlide}