const CustomError = require('./customError');

class RequestValidationError extends CustomError {
  statusCode = 403;

  constructor(message) {
    super(JSON.stringify(message));
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    var arr = JSON.parse(this.message);
    return arr.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}

module.exports = RequestValidationError;
