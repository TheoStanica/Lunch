const NotFoundError = require('../errors/notFoundError');
const Order = require('./model');

const getOrders = async (req, res, next) => {};

const createOrder = async (req, res, next) => {
  try {
    let order = new Order(req.body);
    order = await order.save();

    res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};

const updateOrder = async (req, res, next) => {};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params._orderId });

    if (!order) {
      return next(new NotFoundError('Order not found'));
    }
    await order.delete();

    res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
