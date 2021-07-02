const CustomError = require("./customError");

class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Unauthorized");
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = UnauthorizedError;
