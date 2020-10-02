var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController')
const { getUser } = require('../controllers/getUserController');
const userController = require('../controllers/userController');
const requireLogin = require('../middlewares/requirelogin');



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource')
// })
router.post('/session/login', sessionController.sessionController)
/* GET authenticated user data */
router.get('/user', getUser);
/* POST create user. */
router.post('/', userController.createUserController)
/*DELETE user */
router.delete('/:id',requireLogin,userController.deleteAccount)

module.exports = router;
