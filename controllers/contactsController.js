const { createContact } = require("../services/contactService");
const storeContact = async (req, res) => {
  try {
    // Fix: La respuesta tiene que estar aca
    const resultado = await createContact(req, res);
    // res.send('ok')
  } catch (error) {
    // res.send(error.message);
  }
};

module.exports = { storeContact };
