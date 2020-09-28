var express = require('express');
var router = express.Router();
const sessionController = require('../controllers/sessionController')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource')
// })
router.post('/session/login', sessionController.sessionController)

module.exports = router;
