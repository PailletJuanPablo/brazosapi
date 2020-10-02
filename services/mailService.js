const email = require('../util/email')
const ejs = require('ejs')


const sendEmailTemplate = async (contentBody) => {
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
}
const sendHelloWorldMail = async () => {
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
    
  } catch(error) {
    
  }
}

module.exports = {sendHelloWorldMail, sendEmailTemplate}