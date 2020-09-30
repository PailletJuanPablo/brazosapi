const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController')
const getAllNewsController = require('../controllers/getAllNewsController');
const {uploadNews} = require('../controllers/newsController')
const requireLogin = require('../middlewares/requirelogin')

router.get('/', getAllNewsController);

router.get('/news/:id', newsController.getNewsForId);


//Todo: Cambiar esta linea para usarlo con usuarios registrados y testear el funcionamiento
// router.post('/news',requireLogin, uploadNews)
router.post('/', uploadNews)

module.exports = router;
