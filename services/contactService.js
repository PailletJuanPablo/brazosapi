const db = require('../models');
const { contactSchema } = require('../joivalidation/contacts');
const emailService = require('./mailService')

const createContact = async (data) => {
	let result,statusCode
	try {
		await contactSchema.validateAsync(data);
		const newContact = await db.Contact.create(data)
		result= {
			id:newContact.id,
			fullName:newContact.fullName,
			email:newContact.email,
			phone:newContact.phone,
			message:newContact.message
		}
		statusCode=201;

		console.log(result);
		//emailService.sendContact(contact)

		
	} catch (error) {
		result = { msg : error.message}
    	statusCode = error.statusCode || 500;
	}

	return{
		result,
		statusCode
	}
};

module.exports = { createContact };
