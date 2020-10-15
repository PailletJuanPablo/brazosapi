const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const requireLogin = require('../middlewares/requirelogin')

router.get('/', newsController.getAll);
router.get('/:id', newsController.getById);
// router.post('/:id', newsController.updateById);
router.post('/',requireLogin, newsController.create);
router.delete('/:id',requireLogin, newsController.deleteById);
router.put('/:id', requireLogin, newsController.editById)

module.exports = router;
