const router = require('express').Router();
const passwordRecoveryController = require('../controllers/passwordRecoveryController');

router.post('/recover_password', passwordRecoveryController.recover);

module.exports = router;
