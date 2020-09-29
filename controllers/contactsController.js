const { contactService } = require("../services/contactService");
const storeContact = async (req, res) => {
  try {
    const resultado = await contactService(req, res);
    res.send('ok')
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { storeContact };
