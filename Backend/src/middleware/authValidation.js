const jwt = require("jsonwebtoken");
const ForbiddenError = require("../errors/forbiddenError");
const UnauthorizedError = require("../errors/unauthorizedError");

const authValidation = (req, res, next) => {
  const accessToken = req.header("authorization");

  if (!accessToken) {
    throw new ForbiddenError();
  }

  try {
    const token = accessToken.split(" ")[1],
      payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = payload;
    next();
  } catch (errror) {
    throw new UnauthorizedError();
  }
};

module.exports = {
  authValidation,
};
