require('dotenv')
const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
const from = process.env.SENDGRID_USER
const send = async (to, subject, text, html) => {
  await sendgrid.send({
    to: to,
    from,
    subject,
    // text,
    html
  })
}

module.exports = {send}