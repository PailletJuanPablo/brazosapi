const email = require('../util/email')
const ejs = require('ejs')
const db = require('../models/')
// Este metodo es para usarse de manera asincrona
const OngID = 1
const sendWelcome = async (user, ong) => {
  try {
    let ongName 
    if (!ongName) {
      const result = await db.Organization.findOne({
        where: {
          id: OngID
        }
      })
      if (result) {
        ongName = result.name
      } else {
        ongName = 'Brazos Abiertos'
      }
    } else {
      ongName = ong
    }
    const body = await ejs.renderFile('views/email/welcome.ejs', {
      firstName: user.firstName,
      ongName
    })
    const renderedEmail = await generateEmail(body)
    await email.send(user.email, `${ongName} - Bienvenid@`, null, renderedEmail)
  } catch(error) {
    console.log(error.message)
  }
}

const generateEmail = async (contentBody) => {
    return emailTemplate = await ejs.renderFile('views/email/template.ejs', {
      body: contentBody
    })
}
// Este metodo requiere hacer un archivo EJS y pasarselo renderizado como contentBody

const sendTemplate = async (contentBody) => {
  let statusCode, result
  try {
    const emailTemplate = await ejs.renderFile('views/email/template.ejs', {
      body: contentBody
    })
    statusCode = 201
    result= {message: 'El mail ha sido enviado' }
  } catch(error) {
    statusCode = error.statusCode || 500
    result = {message: 'No se pudo enviar el mail'}
  }
  return {
    result,
    statusCode
  }
}
const mailAddress = ''
const sendHelloWorld = async () => {
  let statusCode, result
  try {
    const body = await ejs.renderFile('views/email/example.ejs')
    const emailTemplate = await ejs.renderFile('views/email/template.ejs', {
      body
    })
    // return emailTemplate
    // console.log('Creamos el template')
    await email.send(mailAddress, 'Probando EMails', '', emailTemplate)
    // return emailTemplate
    statusCode = 201
    result= {message: 'El mail ha sido enviado' }
  } catch(error) {
    statusCode = error.statusCode || 500
    result = {message: 'No se pudo enviar el mail'}
  }
  return {
    result,
    statusCode
  }
}

module.exports = {sendHelloWorld, sendTemplate, sendWelcome}