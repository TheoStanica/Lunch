const RequestValidationError = require("../errors/requestValidationError");
const { check, validationResult } = require("express-validator");

const validationResults = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};

const isUserValid = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email"),
  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must have a minimum length of 8.")
    .matches(/([A-Z])+/)
    .withMessage("Password must have at least one upper letter.")
    .matches(/[a-z]+/)
    .withMessage("Password must have at least one lower letter.")
    .matches(/\d+/)
    .withMessage("Password must have at least one digit.")
    .matches(/[@$!%*?&]+/)
    .withMessage("Password must have at least one special character."),
  check("fullname")
    .notEmpty()
    .withMessage("Fullname is required.")
    .matches(/^[A-Z][- a-zA-Z]+$/)
    .withMessage("Invalid fullname."),
];

module.exports = {
  validationResults,
  isUserValid,
};
