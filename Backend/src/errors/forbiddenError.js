const CustomError = require("./customError");

class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor() {
    super("Forbidden");
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = ForbiddenError;
