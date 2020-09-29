const db = require('../models');
const { contactSchema } = require('../joivalidation/contacts');
const contactService = async (req, res) => {
//console.log(contactSchema);

	try {
        const result = await contactSchema.validateAsync(req.body);
		await db.Contact.create(result) 
			res.send('su mensaje fue enviado con exito');
        
        
	} catch (error) {
		res.send(error.message);
	}
};

module.exports = { contactService };
