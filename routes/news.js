var express = require('express');
var router = express.Router();
const newsController = require('../controllers/newsController')


/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});
router.post('/news/:id', newsController.getNewsForId)

module.exports = router;
