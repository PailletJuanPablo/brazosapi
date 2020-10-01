const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController')
const getAllNewsController = require('../controllers/getAllNewsController');

router.get('/', getAllNewsController);

router.get('/:id', newsController.getById);

router.post('/:id', newsController.updateById);

module.exports = router;
