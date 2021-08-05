const CustomError = require('./customError');

class InternalServerError extends CustomError {
  statusCode = 500;

  constructor() {
    super();
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Oops, something went wrong' }];
  }
}

module.exports = InternalServerError;
