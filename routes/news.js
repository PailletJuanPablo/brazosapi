const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/', newsController.getAll);
router.get('/:id', newsController.getById);

module.exports = router;
