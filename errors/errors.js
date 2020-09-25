class IncompleteData extends Error {
    constructor(message) {
      super()
      Error.captureStackTrace(this, this.constructor)
      this.statusCode = 400
      this.message = message || 'Faltan datos'
    }
  }

  class ExistingEmail extends Error {
    constructor(message) {
      super()
      Error.captureStackTrace(this, this.constructor)
      this.statusCode = 404
      this.message = message || 'Ya existe email'
    }
  }

module.exports = {
  IncompleteData, ExistingEmail
}