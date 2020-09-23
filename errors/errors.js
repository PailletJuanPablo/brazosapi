class DatosIncompletos extends Error {
    constructor(message) {
      super()
      Error.captureStackTrace(this, this.constructor)
      this.statusCode = 400
      this.message = message || 'Faltan datos'
    }
  }

  class EmailExistente extends Error {
    constructor(message) {
      super()
      Error.captureStackTrace(this, this.constructor)
      this.statusCode = 404
      this.message = message || 'Ya existe email'
    }
  }

module.exports = {
    DatosIncompletos, EmailExistente
}