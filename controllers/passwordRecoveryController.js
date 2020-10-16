const passwordRecoveryService = require('../services/passwordRecoveryService');
const emailService = require('../services/mailService');
const {development} = require('../config/config');

const recover = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await passwordRecoveryService.getUser(email);
    if (!user) {
      console.log('Email/User does not exist.');
      res.status(200).json({ message: 'OK' });
    } else {
      const token = await passwordRecoveryService.createToken(email);
      await emailService.sendRecoveryEmail(
        user,
        `${development.frontAddress}/recuperar_clave?token=${token}`
      );
      res.status(200).json({ message: 'OK' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).res.json({  message: 'Server error. Could not recover password.'});;
  }
};

module.exports = { recover };
