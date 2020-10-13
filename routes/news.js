const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');


router.get('/', newsController.getAll);
router.get('/:id', newsController.getById);
router.post('/:id', newsController.updateById);
router.post('/', newsController.uploadNews);
router.delete('/:id', newsController.deleteById);
router.put('/:id',newsController.editById)

module.exports = router;
