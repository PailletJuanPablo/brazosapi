const passwordRecoveryService = require('../services/passwordRecoveryService');

const recover = async (req, res) => {
  const { email } = req.body;
  const user = await passwordRecoveryService.getUser(email);
  if (!user) {
    console.log('Email/User does not exist.');
  } else {
    passwordRecoveryService.createToken(email);

    /*Enviar un email al usuario, que contendrá el link
    para recuperar contraseña, con el token como parametro
    (/recuperar_clave?token=$token)*/
  }
};

module.exports = { recover };
