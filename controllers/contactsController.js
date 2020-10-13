const contactService = require("../services/contactService");
const storeContact = async (req, res) => {

  const contact = await contactService.createContact(req.body);
  res.status(contact.statusCode).json(contact.result);

};

module.exports = { storeContact };
