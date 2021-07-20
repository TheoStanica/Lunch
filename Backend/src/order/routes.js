const router = require('express').Router();

const { userAuthValidation } = require('../middleware/authValidation');

const orderController = require('./controller');

router.get('/', userAuthValidation, orderController.getOrders);
router.post('/', userAuthValidation, orderController.createOrder);
router.put('/:orderId', userAuthValidation, orderController.updateOrder);
router.delete('/:_orderId', userAuthValidation, orderController.deleteOrder);

module.exports = router;
