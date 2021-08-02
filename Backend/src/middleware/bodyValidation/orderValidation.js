const { check, param, query } = require('express-validator');
const { courseRequiredType, orderStatus } = require('../../utils/enums');

const filterValidationSchema = [
  query('_id')
    .notEmpty()
    .withMessage('Order ID is required')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid order ID')
    .optional(),
  query('type')
    .notEmpty()
    .withMessage('Type is required.')
    .isIn([courseRequiredType.restaurant, courseRequiredType.takeaway])
    .withMessage('Type should be restaurant or takeaway')
    .optional(),
  query('status')
    .notEmpty()
    .withMessage('Status is required.')
    .isIn([orderStatus.active, orderStatus.cancelled])
    .withMessage('Status should be active or cancelled')
    .optional(),
  query('menuId')
    .notEmpty()
    .withMessage('MenuId is required')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid menuId')
    .optional(),
  query('userId')
    .notEmpty()
    .withMessage('UserID is required')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid userId')
    .optional(),
  query('createdAfter')
    .notEmpty()
    .withMessage('CreatedAfter is required')
    .isISO8601()
    .withMessage('CreatedAftert must be a valid date.')
    .optional(),
  query('createdBefore')
    .notEmpty()
    .withMessage('Created Before is required')
    .isISO8601()
    .withMessage('Created Before must be a valid date.')
    .optional(),
];

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
    .withMessage('Please provide a valid user ID')
    .optional(),
  check('type')
    .notEmpty()
    .withMessage('Type is required.')
    .isIn([courseRequiredType.restaurant, courseRequiredType.takeaway])
    .withMessage('Type should be restaurant or takeaway'),
  check('menuOptions')
    .if(check('type').equals(courseRequiredType.takeaway))
    .notEmpty()
    .withMessage('Menu options are required'),
  check('menuOptions.*')
    .if(check('type').equals(courseRequiredType.takeaway))
    .isNumeric()
    .withMessage('Menu option should be a number'),
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
  check('menuOptions')
    .if(check('type').equals(courseRequiredType.takeaway))
    .notEmpty()
    .withMessage('Menu options are required')
    .optional(),
  check('menuOptions.*')
    .if(check('type').equals(courseRequiredType.takeaway))
    .isNumeric()
    .withMessage('Menu option should be a number'),
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
  filterValidationSchema,
};
