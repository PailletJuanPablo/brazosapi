const emailService = require('../services/mailService')

const helloWorld = async (req, res) => {
  const result = await emailService.sendHelloWorld()
  res.status(result.statusCode).json(result.result)
}

module.exports = {helloWorld}