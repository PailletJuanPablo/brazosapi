var express = require('express');
var router = express.Router();
const newsController = require('../controllers/newsController')


router.post('/news/:id', newsController.getNewsForId)

module.exports = router;
