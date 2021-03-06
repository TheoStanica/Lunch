const { check, param } = require('express-validator');
const { accountStatus, accountRole } = require('../../utils/enums');

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
    .isIn([accountRole.user, accountRole.admin])
    .withMessage('Role should be user or admin')
    .optional(),
  check('status')
    .notEmpty()
    .withMessage('Status is required.')
    .isIn([accountStatus.active, accountStatus.pending])
    .withMessage('Status should be active or pending.')
    .optional(),
  check('remindAt')
    .notEmpty()
    .withMessage('RemindAt is required.')
    .matches(/^((1[0-2]|[1-9]):([0-5][0-9]) ([AP][M]))$/)
    .withMessage('RemindAt must match the HH:MM AM/PM format.')
    .optional(),
  check('isReminderOn')
    .isBoolean()
    .withMessage('IsReminderOn must be a boolean.')
    .optional(),
  check('isOfficeNotificationOn')
    .isBoolean()
    .withMessage('IsOfficeNotificationOn must be a boolean.')
    .optional(),
];

const userIdValidationSchema = [
  param('_userId')
    .notEmpty()
    .withMessage('User ID is required.')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid user ID.'),
];

const optionalUserIdValidationSchema = [
  param('_userId')
    .notEmpty()
    .withMessage('User ID is required.')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid user ID.')
    .optional(),
];

module.exports = {
  registerValidationSchema,
  loginValidationSchema,
  forgotPasswordValidationSchema,
  updateValidationSchema,
  userIdValidationSchema,
  optionalUserIdValidationSchema,
};
