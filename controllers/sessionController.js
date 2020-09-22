const sessionService = require('../services/sessionManagerService')

module.exports = {
  sessionController: async (req, res) => {
    const session = await sessionService.SessionLoginService(req.body)
    res.status(session.statusCode).json(session.result)
  }
}