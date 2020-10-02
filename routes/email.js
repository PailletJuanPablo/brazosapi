const emailService = require('../services/mailService')
const router = require('express').Router()

router.get('/', async (req, res) => {
  console.log('paso por aca')
  const pagina = await emailService.sendHelloWorldMail()
  res.send(pagina)
  // res.json({message: 'paso algo, no se que'})
})

module.exports = router