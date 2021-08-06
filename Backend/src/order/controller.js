const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const Order = require('./model');
const Menu = require('../menu/model');
const User = require('../user/model');
const {
  accountRole,
  courseRequiredType,
  orderStatus,
} = require('../utils/enums');
const ForbiddenError = require('../errors/forbiddenError');
const mongoose = require('mongoose');
const InternalServerError = require('../errors/internalServerError');
const moment = require('moment');

const convertFilterToQuery = (filter) => {
  const newFilter = { deleted: false };

  if (filter._id) {
    newFilter._id = filter._id;
  }

  if (filter.type) {
    newFilter.type = filter.type;
  }

  if (filter.status) {
    newFilter.status = filter.status;
  }

  if (filter.menuId) {
    newFilter.menuId = filter.menuId;
  }

  if (filter.userId) {
    newFilter.userId = filter.userId;
  }

  if (filter.createdAfter && filter.createdBefore) {
    newFilter.createdAt = {
      $gte: filter.createdAfter,
      $lte: filter.createdBefore,
    };
  } else {
    if (filter.createdAfter) {
      newFilter.createdAt = { $gte: filter.createdAfter };
    }

    if (filter.createdBefore) {
      newFilter.createdAt = { $lte: filter.createdBefore };
    }
  }

  return newFilter;
};

const checkIfUserCanSetUserId = ({ userId, id, role }) =>
  userId && userId !== id && role === accountRole.user;

const checkMenuTimeState = ({ date, time }) => {
  const day = moment(date).format('L');
  const _time = moment(time, 'h:mm a').format('LT');
  return moment().isAfter(
    moment(day + ' ' + _time, 'MM/DD/YYYY h:mm a').format()
  );
};

const handleOrderCreation = async ({
  data,
  orderType,
  session,
  menuId,
  userId,
}) => {
  await Order.create([data], { session: session });

  if (orderType === courseRequiredType.restaurant) {
    await Menu.findByIdAndUpdate(
      menuId,
      {
        $push: { usersGoing: userId },
      },
      { session: session }
    );
  }
};

const generateUpdateObject = ({ order, type, status, userId, menuOptions }) => {
  const obj = {};
  obj.type = type || order.type;
  obj.status = status || order.status;
  obj.userId = userId || order.userId.id;
  if (
    type === courseRequiredType.takeaway ||
    (order.type === courseRequiredType.takeaway &&
      type !== courseRequiredType.restaurant)
  ) {
    obj.menuOptions = menuOptions ? menuOptions : order.menuOptions;
  } else {
    obj.$unset = { menuOptions: undefined };
  }

  return obj;
};

const handleOrderUpdate = async ({
  session,
  order,
  type,
  status,
  userId,
  menuId,
  menuOptions,
}) => {
  if (
    status === orderStatus.cancelled &&
    order.type === courseRequiredType.restaurant
  ) {
    await Menu.findByIdAndUpdate(
      order.menuId.id,
      {
        $pull: { usersGoing: userId },
      },
      { session: session }
    );
  }

  if (
    status === orderStatus.active &&
    (type === courseRequiredType.restaurant ||
      order.type === courseRequiredType.restaurant)
  ) {
    await Menu.findByIdAndUpdate(
      order.menuId.id,
      {
        $push: { usersGoing: userId },
      },
      { session: session }
    );
  }

  return await Order.findByIdAndUpdate(
    order.id,
    generateUpdateObject({ order, type, status, userId, menuId, menuOptions }),
    { new: true }
  );
};

const checkIfAdminCanUpdateUser = async ({ role, userId, menuId, order }) => {
  return (
    role === accountRole.admin &&
    userId &&
    userId !== order.userId.id &&
    (await Order.findOne({
      userId: userId ? userId : order.userId,
      menuId: menuId ? menuId : order.menuId,
      deleted: false,
    }))
  );
};

const getOrders = async (req, res, next) => {
  try {
    let query =
      Object.keys(req.query).length > 0
        ? convertFilterToQuery(req.query)
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

    orders = await Order.find(query)
      .populate('userId')
      .populate({
        path: 'menuId',
        populate: {
          path: 'restaurantId',
        },
      });

    res.send({ orders });
  } catch (error) {
    return next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    let { userId, menuId, type } = req.body;
    const { id, role } = req.user;

    const menu = await Menu.findOne({ _id: menuId }).populate('restaurantId');
    if (!menu || menu.deleted) {
      return next(new BadRequestError('Please provide a valid menu id.'));
    }

    if (checkIfUserCanSetUserId({ userId, id, role })) {
      return next(new ForbiddenError());
    }
    const { notifyAfter, cancelAt } = menu.restaurantId;
    userId = userId ? userId : id;

    if (!(await User.findOne({ _id: userId }))) {
      return next(new BadRequestError('Please provide a valid user id.'));
    }

    if (checkMenuTimeState({ date: menu.createdAt, time: cancelAt })) {
      return next(
        new BadRequestError('You can no longer make orders for this menu')
      );
    }

    if (await Order.findOne({ userId, menuId, deleted: false })) {
      return next(
        new BadRequestError("Can't create two orders for the same menu.")
      );
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await handleOrderCreation({
        data: { ...req.body, userId },
        orderType: type,
        menuId,
        userId,
        session: session,
      });
      await session.commitTransaction();
      session.endSession();

      if (checkMenuTimeState({ date: menu.createdAt, time: notifyAfter })) {
        // send push notification to admins
      }

      res.sendStatus(201);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return next(new InternalServerError());
    }
  } catch (error) {
    return next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { _orderId } = req.params;
    let { userId, menuId, status, type, menuOptions } = req.body;
    const { id, role } = req.user;

    let order = await Order.findOne({ _id: _orderId })
      .populate({
        path: 'menuId',
        populate: {
          path: 'restaurantId',
        },
      })
      .populate('userId');

    if (!order || order.deleted) {
      return next(new NotFoundError('Order does not exist'));
    }

    if (
      checkIfUserCanSetUserId({ userId, id, role }) ||
      checkIfUserCanSetUserId({ userId: order.userId.id, id, role })
    ) {
      return next(new ForbiddenError());
    }

    const { notifyAfter, cancelAt } = order.menuId.restaurantId;

    if (checkMenuTimeState({ date: order.menuId.createdAt, time: cancelAt })) {
      return next(
        new BadRequestError('You can no longer make orders for this menu')
      );
    }

    if (await checkIfAdminCanUpdateUser({ role, userId, menuId, order })) {
      return next(
        new BadRequestError('User already created and order for this menu.')
      );
    }

    if (userId && !(await User.findOne({ _id: userId }))) {
      return next(new BadRequestError('Please provide a valid user id.'));
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const newOrder = await handleOrderUpdate({
        session,
        order,
        type,
        menuOptions,
        status,
        userId: userId ? userId : id,
      });

      await session.commitTransaction();
      session.endSession();

      if (
        checkMenuTimeState({ date: order.menuId.createdAt, time: notifyAfter })
      ) {
        // send push notification to admins
      }
      res.send({ order: newOrder });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return next(new InternalServerError());
    }
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
