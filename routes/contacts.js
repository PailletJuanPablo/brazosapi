var express = require('express');
var router = express.Router();
const contactsController = require('../controllers/contactsController');
router.post('/', contactsController.storeContact)

module.exports = router;