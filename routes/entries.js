const express = require('express');
const router = express.Router();
const entriesController = require('../controllers/entriesController');
const requireLogin = require('../middlewares/requirelogin');

router.get('/', entriesController.getAll);
router.get('/:id', entriesController.getById);
router.delete('/:id', requireLogin, entriesController.deleteById);
router.put('/:id',requireLogin, entriesController.editById);
router.post('/', requireLogin, entriesController.create);

module.exports = router;