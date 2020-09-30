const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController')
const getAllNewsController = require('../controllers/getAllNewsController');

router.get('/', getAllNewsController);
router.get('/news/:id', newsController.getNewsForId);



module.exports = router;
