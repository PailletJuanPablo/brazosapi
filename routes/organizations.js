const router = require('express').Router()
const organizationController = require('../controllers/organizationController')
const requireLogin = require('../middlewares/requirelogin');

router.get('/public/', organizationController.public);

router.patch('/:id', requireLogin, organizationController.updateById);

module.exports = router;
