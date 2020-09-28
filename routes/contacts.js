var express = require('express');
var router = express.Router();
const contactsController = require('../controllers/contactsController');
router.post('/', contactsController.storeContact)
// POST contacts
module.exports = router;