const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');


router.get('/', newsController.getAll);
router.get('/:id', newsController.getById);
router.post('/:id', newsController.updateById);
router.put('/:id', newsController.edit);

module.exports = router;
