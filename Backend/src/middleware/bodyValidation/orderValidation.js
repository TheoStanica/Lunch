const { check, param } = require('express-validator');
const { courseRequiredType, orderStatus } = require('../../utils/enums');

const createValidationSchema = [
  check('menuId')
    .notEmpty()
    .withMessage('Menu ID is required')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid menu ID'),
  check('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid user ID'),
  check('type')
    .notEmpty()
    .withMessage('Type is required.')
    .isIn([courseRequiredType.restaurant, courseRequiredType.takeaway])
    .withMessage('Type should be restaurant or takeaway'),
  check('appetizer')
    .notEmpty()
    .withMessage('Appetizer option is required.')
    .isNumeric()
    .withMessage('Appetizer option must be a number'),
  check('mainCourse')
    .notEmpty()
    .withMessage('Main Course option is required.')
    .isNumeric()
    .withMessage('Main Course option must be a number'),
  check('desert')
    .notEmpty()
    .withMessage('Desert option is required.')
    .isNumeric()
    .withMessage('Desert optoion must be a number'),
];

const updateValidationSchema = [
  check('menuId')
    .notEmpty()
    .withMessage('Menu ID is required')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid menu ID')
    .optional(),
  check('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid user ID')
    .optional(),
  check('type')
    .notEmpty()
    .withMessage('Type is required.')
    .isIn([courseRequiredType.restaurant, courseRequiredType.takeaway])
    .withMessage('Type should be restaurant or takeaway')
    .optional(),
  check('status')
    .notEmpty()
    .withMessage('Status is required.')
    .isIn([orderStatus.active, orderStatus.cancelled])
    .withMessage('Status should be active or cancelled')
    .optional(),
  check('appetizer')
    .notEmpty()
    .withMessage('Appetizer option is required.')
    .isNumeric()
    .withMessage('Appetizer option must be a number')
    .optional(),
  check('mainCourse')
    .notEmpty()
    .withMessage('Main Course option is required.')
    .isNumeric()
    .withMessage('Main Course option must be a number')
    .optional(),
  check('desert')
    .notEmpty()
    .withMessage('Desert option is required.')
    .isNumeric()
    .withMessage('Desert optoion must be a number')
    .optional(),
];

const orderIdValidationSchema = [
  param('_orderId')
    .notEmpty()
    .withMessage('Order ID is required.')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid order ID.'),
];

module.exports = {
  createValidationSchema,
  updateValidationSchema,
  orderIdValidationSchema,
};
