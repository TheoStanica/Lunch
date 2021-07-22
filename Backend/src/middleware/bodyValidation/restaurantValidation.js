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
    .withMessage('Cancel At is required')
    .matches(/^((1[0-2]|[1-9]):([0-5][0-9]) ([AP][M]))$/)
    .withMessage('Cancel At must match the HH:MM AM/PM format.'),
  check('notifyAfter')
    .notEmpty()
    .bail()
    .withMessage('Notify After is required')
    .matches(/^((1[0-2]|[1-9]):([0-5][0-9]) ([AP][M]))$/)
    .withMessage('Notify After must match the HH:MM AM/PM format.'),
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
    .withMessage('Cancel At is required')
    .matches(/^((1[0-2]|[1-9]):([0-5][0-9]) ([AP][M]))$/)
    .withMessage('Cancel At must match the HH:MM AM/PM format.')
    .optional(),
  check('notifyAfter')
    .notEmpty()
    .bail()
    .withMessage('Notify After is required')
    .matches(/^((1[0-2]|[1-9]):([0-5][0-9]) ([AP][M]))$/)
    .withMessage('Notify After must match the HH:MM AM/PM format.')
    .optional(),
];

module.exports = {
  createRestaurantValidationSchema,
  restaurantIdValidationSchema,
  updateRestaurantValidationSchema,
};
