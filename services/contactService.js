const db = require('../models');
const { contactSchema } = require('../joivalidation/contacts');
const emailService = require('./mailService')
const createContact = async (req, res) => {
//console.log(contactSchema);

	try {
		const result = await contactSchema.validateAsync(req.body);
		const contact = await db.Contact.create(result) 
		emailService.sendContact(contact)
		res.json({message:'su mensaje fue enviado con exito'});
        
        
	} catch (error) {
		res.status(error.statusCode || 500).send({message: 'No se ha podido realizar su peticion'});
	}
};

module.exports = { createContact };
