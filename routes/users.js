var express = require('express');
var router = express.Router();

const { getUser } = require('../controllers/getUserController');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

/* GET authenticated user data */
router.get('/user', getUser);

module.exports = router;
