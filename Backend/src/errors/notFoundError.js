const CustomError = require('./customError');

class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = NotFoundError;
