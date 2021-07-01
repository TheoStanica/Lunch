const CustomError = require('./customError');

class AccountNotActivatedError extends CustomError {
  statusCode = 403;

  constructor() {
    super('Please activate your account');
    Object.setPrototypeOf(this, AccountNotActivatedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = AccountNotActivatedError;
