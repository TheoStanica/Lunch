const RequestValidationError = require('../../errors/requestValidationError');
const { check, validationResult } = require('express-validator');

const validationResults = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
  next();
};

const registerValidationSchema = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email'),
  check('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must have a minimum length of 8.')
    .matches(/([A-Z])+/)
    .withMessage('Password must have at least one upper letter.')
    .matches(/[a-z]+/)
    .withMessage('Password must have at least one lower letter.')
    .matches(/\d+/)
    .withMessage('Password must have at least one digit.')
    .matches(/[@$!%*?&]+/)
    .withMessage('Password must have at least one special character.'),
  check('fullname')
    .notEmpty()
    .withMessage('Fullname is required.')
    .matches(/^[A-Z][- a-zA-Z]+$/)
    .withMessage('Invalid fullname.'),
];

const loginValidationSchema = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email'),
  check('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must have a minimum length of 8.')
    .matches(/([A-Z])+/)
    .withMessage('Password must have at least one upper letter.')
    .matches(/[a-z]+/)
    .withMessage('Password must have at least one lower letter.')
    .matches(/\d+/)
    .withMessage('Password must have at least one digit.')
    .matches(/[@$!%*?&]+/)
    .withMessage('Password must have at least one special character.'),
];

const forgotPasswordValidationSchema = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email')
    .optional(),
  check('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must have a minimum length of 8.')
    .matches(/([A-Z])+/)
    .withMessage('Password must have at least one upper letter.')
    .matches(/[a-z]+/)
    .withMessage('Password must have at least one lower letter.')
    .matches(/\d+/)
    .withMessage('Password must have at least one digit.')
    .matches(/[@$!%*?&]+/)
    .withMessage('Password must have at least one special character.')
    .optional(),
];

const updateValidationSchema = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email')
    .optional(),
  check('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8 })
    .withMessage('Password must have a minimum length of 8.')
    .matches(/([A-Z])+/)
    .withMessage('Password must have at least one upper letter.')
    .matches(/[a-z]+/)
    .withMessage('Password must have at least one lower letter.')
    .matches(/\d+/)
    .withMessage('Password must have at least one digit.')
    .matches(/[@$!%*?&]+/)
    .withMessage('Password must have at least one special character.')
    .optional(),
  check('fullname')
    .notEmpty()
    .withMessage('Fullname is required.')
    .matches(/^[A-Z][- a-zA-Z]+$/)
    .withMessage('Invalid fullname.')
    .optional(),
  check('role')
    .notEmpty()
    .withMessage('Role is required.')
    .isIn(['user', 'admin'])
    .withMessage('Role should be user or admin')
    .optional(),
  check('status')
    .notEmpty()
    .withMessage('Status is required.')
    .isIn(['active', 'pending'])
    .withMessage('Status should be active or pending.')
    .optional(),
];

module.exports = {
  validationResults,
  registerValidationSchema,
  loginValidationSchema,
  forgotPasswordValidationSchema,
  updateValidationSchema,
};
