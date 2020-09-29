const { createContact } = require("../services/contactService");
const storeContact = async (req, res) => {
  try {
    const resultado = await createContact(req, res);
    res.send('ok')
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { storeContact };
