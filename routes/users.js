var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController')
const { getUser } = require('../controllers/getUserController');
const userController = require('../controllers/userController');



/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});
router.post('/session/login', sessionController.sessionController)
/* GET authenticated user data */
router.get('/user', getUser);
/* POST create user. */
router.post('/', userController.createUserController)

module.exports = router;
