const express = require('express');
const router = express.Router();
const slidesController = require('../controllers/slidesController');
router.get('/', slidesController.getAll);
router.post('/', slidesController.storeSlide)
router.put('/', slidesController.update)

module.exports = router;

