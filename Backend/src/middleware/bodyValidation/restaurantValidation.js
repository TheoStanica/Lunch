const { check, param } = require('express-validator');
const { restaurantStatus } = require('../../utils/enums');

const createRestaurantValidationSchema = [
  check('name').notEmpty().withMessage('Please provide a valid name'),
  check('cost')
    .notEmpty()
    .bail()
    .withMessage('Cost is required.')
    .isNumeric()
    .withMessage('Cost must be a number'),
  check('cancelAt')
    .notEmpty()
    .bail()
    .withMessage('cancelAt is required')
    .isISO8601()
    .withMessage('cancelAt must be a valid date'),
  check('notifyAfter')
    .notEmpty()
    .bail()
    .withMessage('notifyAfter is required')
    .isISO8601()
    .withMessage('notifyAfter must be a valid date'),
];

const restaurantIdValidationSchema = [
  param('_id')
    .notEmpty()
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid restaurant ID'),
];

const updateRestaurantValidationSchema = [
  check('name')
    .notEmpty()
    .withMessage('Please provide a valid name')
    .optional(),
  check('cost').optional().isNumeric().withMessage('Cost must be a number'),
  check('status')
    .optional()
    .isIn([restaurantStatus.active, restaurantStatus.inactive])
    .withMessage('Should be active or inactive.'),
  check('cancelAt')
    .notEmpty()
    .bail()
    .withMessage('cancelAt is required')
    .isISO8601()
    .withMessage('cancelAt must be a valid date')
    .optional(),
  check('notifyAfter')
    .notEmpty()
    .bail()
    .withMessage('notifyAfter is required')
    .isISO8601()
    .withMessage('notifyAfter must be a valid date')
    .optional(),
];

module.exports = {
  createRestaurantValidationSchema,
  restaurantIdValidationSchema,
  updateRestaurantValidationSchema,
};
