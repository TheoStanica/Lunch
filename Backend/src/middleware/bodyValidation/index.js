const RequestValidationError = require('../../errors/requestValidationError');
const { validationResult } = require('express-validator');

const validationResults = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};

module.exports = {
  validationResults,
};
