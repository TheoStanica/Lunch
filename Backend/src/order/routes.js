const router = require('express').Router();

const { userAuthValidation } = require('../middleware/authValidation');

const orderController = require('./controller');

router.get('/', userAuthValidation, orderController.getOrders);
router.post('/', userAuthValidation, orderController.createOrder);
router.put('/', userAuthValidation, orderController.updateOrder);
router.delete('/', userAuthValidation, orderController.deleteOrder);

module.exports = router;
