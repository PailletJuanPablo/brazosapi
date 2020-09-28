const db = require('../models');
const { contactShema } = require('../joivalidation/contacts');

const storeContact = async (req, res) => {
    /*
    1) Obtener todos los datos de la petición post
    2) Validar que estos datos existan
    3) Almacenar estos datos en el modelo Contact
    */
    
    // validación utilizar joi
    try {
       const result = await contactShema.validateAsync(req.body);
       await db.Contact.create(result).then((result) => {
           res.send('su mensaje fue enviado con exito, le responderemos a la brevedad, muchas gracias')
       })
    } catch (error) {
        res.send(error.message);
    }
}


module.exports = { storeContact  };
