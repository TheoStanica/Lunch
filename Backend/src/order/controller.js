const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const Order = require('./model');
const Menu = require('../menu/model');
const User = require('../user/model');
const { accountRole } = require('../utils/enums');
const ForbiddenError = require('../errors/forbiddenError');

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
    const { filter } = req.query;
    let query =
      filter && Object.keys(JSON.parse(filter)).length > 0
        ? convertFilterToQuery(JSON.parse(filter))
        : { deleted: false };

    if (
      query.userId &&
      query.userId !== req.user.id &&
      req.user.role === accountRole.user
    ) {
      return next(new ForbiddenError());
    }

    if (req.user.role === accountRole.user) {
      query.userId = req.user.id;
    }

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

    if (
      req.body.userId &&
      req.body.userId !== req.user.id &&
      req.user.role === accountRole.user
    ) {
      return next(new ForbiddenError());
    }

    const userId = req.body.userId ? req.body.userId : req.user.id;

    if (req.body.userId && !(await User.findOne({ _id: userId }))) {
      return next(new BadRequestError('Please provide a valid user id.'));
    }

    if (
      await Order.findOne({
        userId,
        menuId: req.body.menuId,
        deleted: false,
      })
    ) {
      return next(
        new BadRequestError("Can't create two orders for the same menu.")
      );
    }

    let order = new Order({
      ...req.body,
      userId,
    });
    order = await order.save();

    res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    let order = await Order.findOne({ _id: req.params._orderId });

    if (!order || order.deleted) {
      return next(new NotFoundError('Order not found'));
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

    if (!order || order.deleted) {
      return next(new NotFoundError('Order not found'));
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
