var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController');
const { getUser } = require('../controllers/getUserController');
const usersControllers = require('../controllers/usersControllers');



/* GET authenticated user data */
router.get('/user', getUser);
/* POST create user. */
router.post('/', usersControllers.create);
/* POST session login user. */
router.post('/session/login', sessionController.sessionController);
/*PUT update user data*/
router.put('/:id', usersControllers.update);

module.exports = router;
