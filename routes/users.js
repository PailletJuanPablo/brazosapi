var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController');
const { getUser } = require('../controllers/getUserController');
const usersControllers = require('../controllers/usersControllers');
const requireLogin = require('../middlewares/requirelogin');



/* GET authenticated user data */
router.get('/user', requireLogin,getUser);
/* POST create user. */
router.post('/', usersControllers.create);
/* POST session login user. */
router.post('/session/login', sessionController.sessionController);
/*DELETE user */
router.delete('/:id',requireLogin,usersControllers.deleteAccount)
/*PUT update user data*/
router.put('/:id', requireLogin, usersControllers.update);

module.exports = router;
