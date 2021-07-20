const router = require('express').Router();

const { validationResults } = require('../middleware/bodyValidation/index');
const {
  createValidationSchema,
  updateValidationSchema,
  orderIdValidationSchema,
} = require('../middleware/bodyValidation/orderValidation');

const { userAuthValidation } = require('../middleware/authValidation');

const orderController = require('./controller');

router.get('/', userAuthValidation, orderController.getOrders);

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
  userAuthValidation,
  orderIdValidationSchema,
  validationResults,
  orderController.deleteOrder
);

module.exports = router;
