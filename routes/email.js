// const emailService = require('../services/mailService')
const router = require('express').Router()
const emailsController = require('../controllers/emailsController')
router.get('/', emailsController.helloWorld)

module.exports = router