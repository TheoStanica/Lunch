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

    orders = await Order.find(query).populate('menuId').populate('userId');

    res.send({ orders });
  } catch (error) {
    return next(error);
  }
};

const checkIfUserCanSetUserId = ({ userId, id, role }) =>
  userId && userId !== id && role === accountRole.user;

const checkIfOrderIsCancelled = (cancelAt) =>
  moment().isAfter(moment(cancelAt, ['h:mm A']).format());

const shouldNotifyAdmin = (notifyAfter) =>
  moment().isAfter(moment(notifyAfter, ['h:mm A']).format());

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

const createOrder = async (req, res, next) => {
  try {
    let { userId, menuId, type } = req.body;
    const { id, role } = req.user;

    const menu = await Menu.findOne({ _id: menuId }).populate('restaurantId');
    if (!menu) {
      return next(new BadRequestError('Please provide a valid menu id.'));
    }

    const { notifyAfter, cancelAt } = menu.restaurantId;

    if (checkIfUserCanSetUserId({ userId, id, role })) {
      return next(new ForbiddenError());
    }

    userId = userId ? userId : id;

    if (!(await User.findOne({ _id: userId }))) {
      return next(new BadRequestError('Please provide a valid user id.'));
    }

    if (checkIfOrderIsCancelled(cancelAt)) {
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

      if (shouldNotifyAdmin(notifyAfter)) {
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
    let order = await Order.findOne({ _id: req.params._orderId }).populate({
      path: 'menuId',
      populate: {
        path: 'restaurantId',
      },
    });

    if (!order || order.deleted) {
      return next(new NotFoundError('Order not found'));
    }

    if (
      (req.body.userId &&
        req.body.userId !== req.user.id &&
        req.user.role === accountRole.user) ||
      (req.user.role === accountRole.user &&
        order.userId &&
        order.userId != req.user.id)
    ) {
      return next(new ForbiddenError());
    }

    const userId = req.body.userId ? req.body.userId : req.user.id;

    const { notifyAfter, cancelAt } = order.menuId.restaurantId;
    let sendNotification = false;

    if (moment().isAfter(moment(cancelAt, ['h:mm A']).format())) {
      return next(
        new BadRequestError('You can no longer make orders for this menu')
      );
    }

    if (moment().isAfter(moment(notifyAfter, ['h:mm A']).format())) {
      sendNotification = true;
    }

    if (req.body.menuId && !(await Menu.findOne({ _id: req.body.menuId }))) {
      return next(new BadRequestError('Please provide a valid menu id.'));
    }

    if (req.body.userId && !(await User.findOne({ _id: req.body.userId }))) {
      return next(new BadRequestError('Please provide a valid user id.'));
    }

    order.type = req.body.type || order.type;
    order.status = req.body.status || order.status;
    order.userId = userId || order.userId;
    order.menuId = req.body.menuId || order.menuId;
    order.menuOptions = req.body.menuOptions || order.menuOptions;

    // if body.status === cancelled && old type === restaurant =>> remove from usersGoing
    // body status === active && body.type === restaurant => add to usersGoing

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      if (
        req.body.status === orderStatus.cancelled &&
        order.type === courseRequiredType.restaurant
      ) {
        console.log('removing user');
        await Menu.findByIdAndUpdate(
          order.menuId.id,
          {
            $pull: { usersGoing: userId },
          },
          { session: session }
        );
      }

      if (
        req.body.status === orderStatus.active &&
        (req.body.type === courseRequiredType.restaurant ||
          order.type === courseRequiredType.restaurant)
      ) {
        console.log('adding user');
        await Menu.findByIdAndUpdate(
          order.menuId.id,
          {
            $push: { usersGoing: userId },
          },
          { session: session }
        );
      }

      order = await order.save({ session });

      await session.commitTransaction();
      session.endSession();
      console.log('finished transaction successfully');

      if (sendNotification) {
        // send push notification to admins
      }

      res.send({ order });
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
