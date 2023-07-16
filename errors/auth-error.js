const { ERROR_AUTH } = require('./errors');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_AUTH;
  }
}

module.exports = AuthError;
