const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbiddenError');
const UnauthorizedError = require('../errors/unauthorizedError');
const { accountRole } = require('../utils/enums');

const authValidation = (req, res, next) => {
  const accessToken = req.header('authorization');

  if (!accessToken) {
    throw new ForbiddenError();
  }

  try {
    return jwt.verify(
      accessToken.split(' ')[1],
      process.env.ACCESS_TOKEN_SECRET
    );
  } catch (errror) {
    throw new UnauthorizedError();
  }
};

const userAuthValidation = (req, res, next) => {
  const payload = authValidation(req, res, next);

  req.user = payload;
  next();
};

const adminAuthValidation = (req, res, next) => {
  const payload = authValidation(req, res, next);

  if (payload.role === accountRole.admin) {
    req.user = payload;
    next();
  } else {
    throw new UnauthorizedError();
  }
};

module.exports = {
  userAuthValidation,
  adminAuthValidation,
};
