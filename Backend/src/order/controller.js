const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const Order = require('./model');
const Menu = require('../menu/model');
const User = require('../user/model');

const getOrders = async (req, res, next) => {};

const createOrder = async (req, res, next) => {
  try {
    if (!(await Menu.findOne({ _id: req.body.menuId }))) {
      return next(new BadRequestError('Please provide a valid menu id.'));
    }

    if (!(await User.findOne({ _id: req.body.userId }))) {
      return next(new BadRequestError('Please provide a valid user id.'));
    }

    let order = new Order(req.body);
    order = await order.save();

    res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    let order = await Order.findOne({ _id: req.params._orderId });

    if (!order) {
      return next(new NotFoundError('Order not found'));
    }

    order.type = req.body.type || order.type;
    order.status = req.body.status || order.status;
    order.userId = req.body.userId || order.userId;
    order.menuId = req.body.menuId || order.menuId;
    order.appetizer = req.body.appetizer || order.appetizer;
    order.mainCourse = req.body.mainCourse || order.mainCourse;
    order.desert = req.body.desert || order.desert;

    order = await order.save();

    res.send({ order });
  } catch (error) {
    return next(error);
  }
};

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
