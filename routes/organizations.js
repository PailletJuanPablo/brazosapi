const router = require('express').Router()
const organizationController = require('../controllers/organizationController')

router.get('/public/', organizationController.public);


module.exports = router;
