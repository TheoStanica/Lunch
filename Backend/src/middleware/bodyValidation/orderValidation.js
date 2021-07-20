const { check, param } = require('express-validator');

const orderIdValidationSchema = [
  param('_orderId')
    .notEmpty()
    .withMessage('Order ID is required.')
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage('Please provide a valid order ID.'),
];

module.exports = {
  orderIdValidationSchema,
};
