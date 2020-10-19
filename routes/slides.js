const express = require('express');
const router = express.Router();
const slidesController = require('../controllers/slidesController');
router.get('/', slidesController.getAll);
router.post('/', slidesController.uploadSlide)
router.put('/:id', slidesController.update)

module.exports = router;

