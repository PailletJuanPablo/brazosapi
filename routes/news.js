const express = require('express');
const router = express.Router();
const getAllNewsController = require('../controllers/getAllNewsController');

router.get('/', getAllNewsController);

module.exports = router;
