const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entriesController');

router.get('/', entriesController.getAll);
router.get('/:id', entriesController.getById);
router.delete('/:id', entriesController.deleteById);
router.put('/:id',entriesController.editById)

module.exports = router;
