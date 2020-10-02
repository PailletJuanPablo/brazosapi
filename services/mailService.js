const email = require('../util/email')
const ejs = require('ejs')

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
const sendHelloWorld = async () => {
  let statusCode, result
  try {
    const body = await ejs.renderFile('views/email/example.ejs')
    const emailTemplate = await ejs.renderFile('views/email/template.ejs', {
      body
    })
    // return emailTemplate
    // console.log('Creamos el template')
    await email.send('santiagolky@gmail.com', 'Probando', 'No se donde aparece esto', emailTemplate)
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

module.exports = {sendHelloWorld, sendTemplate}