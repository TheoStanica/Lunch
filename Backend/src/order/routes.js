const router = require('express').Router();

const { validationResults } = require('../middleware/bodyValidation/index');
const {
  createValidationSchema,
  updateValidationSchema,
  orderIdValidationSchema,
  filterValidationSchema,
} = require('../middleware/bodyValidation/orderValidation');

const {
  userAuthValidation,
  adminAuthValidation,
} = require('../middleware/authValidation');

const orderController = require('./controller');

router.get(
  '/',
  userAuthValidation,
  filterValidationSchema,
  validationResults,
  orderController.getOrders
);

router.post(
  '/',
  userAuthValidation,
  createValidationSchema,
  validationResults,
  orderController.createOrder
);

router.put(
  '/:_orderId',
  userAuthValidation,
  orderIdValidationSchema,
  updateValidationSchema,
  validationResults,
  orderController.updateOrder
);

router.delete(
  '/:_orderId',
  adminAuthValidation,
  orderIdValidationSchema,
  validationResults,
  orderController.deleteOrder
);

module.exports = router;
