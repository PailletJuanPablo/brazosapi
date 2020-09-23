var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController')
const { getUser } = require('../controllers/getUserController');

router.post('/session/login', sessionController.sessionController)


/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

/* GET authenticated user data */
router.get('/user', getUser);

module.exports = router;
