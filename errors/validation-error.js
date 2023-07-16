const { ERROR_BAD_REQUEST } = require('./errors');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_BAD_REQUEST;
  }
}

module.exports = ValidationError;
