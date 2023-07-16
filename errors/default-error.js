const { ERROR_DEFAULT } = require('./errors');

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_DEFAULT;
  }
}

module.exports = DefaultError;
