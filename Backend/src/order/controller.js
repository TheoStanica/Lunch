const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const Order = require('./model');
const Menu = require('../menu/model');
const User = require('../user/model');

const convertFilterToQuery = (filter) => {
  const newFilter = { deleted: false };

  if (filter._id) {
    newFilter._id = filter._id;
  }

  if (filter.type) {
    newFilter.type = filter.type;
  }

  if (filter.status) {
    newFilter.states = filter.status;
  }

  if (filter.menuId) {
    newFilter.menuId = filter.menuId;
  }

  if (filter.userId) {
    newFilter.userId = filter.userId;
  }

  if (filter.createdAt && filter.endedAt) {
    newFilter.createdAt = { $gte: filter.createdAt, $lte: filter.endedAt };
  } else {
    if (filter.createdAt) {
      newFilter.createdAt = { $gte: filter.createdAt };
    }

    if (filter.endedAt) {
      newFilter.createdAt = { $lte: filter.endedAt };
    }
  }

  return newFilter;
};

const getOrders = async (req, res, next) => {
  try {
    const query = req.query.filter
        ? convertFilterToQuery(JSON.parse(req.query.filter))
        : { deleted: false },
      orders = await Order.find(query).populate('menuId').populate('userId');

    res.send({ orders });
  } catch (error) {
    return next(error);
  }
};

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

    if (order.deleted) {
      return next(new BadRequestError('Order is inactive.'));
    }

    if (req.body.menuId && !(await Menu.findOne({ _id: req.body.menuId }))) {
      return next(new BadRequestError('Please provide a valid menu id.'));
    }

    if (req.body.userId && !(await User.findOne({ _id: req.body.userId }))) {
      return next(new BadRequestError('Please provide a valid user id.'));
    }

    order.type = req.body.type || order.type;
    order.status = req.body.status || order.status;
    order.userId = req.body.userId || order.userId;
    order.menuId = req.body.menuId || order.menuId;
    order.menuOptions = req.body.menuOptions || order.menuOptions;

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

    if (order.deleted) {
      return next(new BadRequestError('Order is inactive.'));
    }

    order.deleted = true;
    await order.save();

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
