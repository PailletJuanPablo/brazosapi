const express = require('express');
const router = express.Router();
const testimonyController = require('../controllers/testimonyController');
const requireLogin = require('../middlewares/requirelogin');

router.get('/', testimonyController.getAll)

router.post('/', requireLogin, testimonyController.uploadTestimony);

router.put('/:id', requireLogin, testimonyController.editById);

router.delete('/:id', requireLogin, testimonyController.deleteById)

module.exports = router;