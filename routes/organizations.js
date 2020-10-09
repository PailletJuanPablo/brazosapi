const router = require('express').Router()
const organizationController = require('../controllers/organizationController')

router.get('/public/', organizationController.public);

router.patch('/:id', organizationController.updateById);

module.exports = router;
