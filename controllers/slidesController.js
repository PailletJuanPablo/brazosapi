const {slideAll, create, updateSlide} = require('../services/slidesService');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fields: 4,
    fileSize: 60000000,
    files: 1,
    parts: 5
  }
});

const getAll = async (req, res) => {
  try {
    const slides = await slideAll(req, res);
    return res.json({ message: 'OK', slides });
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
};

// const storeSlide = async (req, res) => {
//   try {
//     const resultado = await createSlide(req, res);
//     // res.send('ok')
//   } catch (error) {
//     console.log(error)
//   }
// };

const uploadSlide = (req, res) => {
  upload.single('media')(req, res, async (err) => {
    //ToDo:
    const slide = {
      bienvenida: req.body.bienvenida,
      text: req.body.text,
      order: req.body.order
    };
    //2. Descomentar y comentar cuando agreguen el middleware requireLogin a la ruta(antes que este asi le mete el req.user)
    userId = 1;
    // const userId = req.user.userId
    const result = await create(slide, req.file, userId);
    res.status(result.statusCode).json(result.result);
  });
};

const update = (req, res) => {
  upload.single('media')(req, res, async (err) => {
    //ToDo:
    const slide = {
      bienvenida: req.body.bienvenida,
      text: req.body.text,
      order: req.body.order
    };
    //2. Descomentar y comentar cuando agreguen el middleware requireLogin a la ruta(antes que este asi le mete el req.user)
    userId = 1;
    // const userId = req.user.userId
    const result = await updateSlide(req.params.id, slide, req.file, userId);
    res.status(result.statusCode).json(result.result);
  });
};

// const update = async (req, res) => {
//   try {
//     const resultado = await updateSlide(req, res);
//     // res.send('ok')
//   } catch (error) {
//     console.log(error)
//   }
// };


module.exports = {getAll, update, uploadSlide}