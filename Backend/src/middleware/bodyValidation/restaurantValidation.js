const { check, param } = require('express-validator');

const createRestaurantValidationSchema = [
  check('name').notEmpty().withMessage('Please provide a valid name'),
  check('cost')
    .notEmpty()
    .withMessage('Cost is required.')
    .isNumeric()
    .withMessage('Cost must be a number'),
];
const restaurantIdValidationSchema = [
  param('_id')
    .notEmpty()
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid restaurant ID'),
];

const updateRestaurantValidationSchema = [
  check('name').optional(),
  check('cost').optional().isNumeric().withMessage('Cost must be a number'),
];

module.exports = {
  createRestaurantValidationSchema,
  restaurantIdValidationSchema,
  updateRestaurantValidationSchema,
};
