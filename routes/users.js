var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const {check} = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST create user. */
router.post('/',
[
  check('firstName', 'El Nombre es obligatorio').not().isEmpty(),
  check('lastName', 'El Apellido es obligatorio').not().isEmpty(),
  check('email', 'Agrega un Email valido').isEmail(),
  check('password', 'El password deve contener 6 caracteres como minimo').isLength({min:6})
],
 userController.crateUser
 )

module.exports = router;
