const mongoose = require('mongoose');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const InternalServerError = require('../errors/internalServerError');
const Restaurant = require('../restaurant/model');
const Menu = require('./model');
const Order = require('../order/model');
const {
  restaurantStatus,
  orderStatus,
  courseRequiredType,
} = require('../utils/enums');
const { sendNotification } = require('../utils/notificationSender');

const convertFilterToQuery = (filter) => {
  const newFilter = { deleted: false };

  if (filter._id) {
    newFilter._id = filter._id;
  }
  if (filter.restaurantId) {
    newFilter.restaurantId = filter.restaurantId;
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

const createMenu = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.body.restaurantId);

    if (!restaurant || restaurant.deleted) {
      return next(new BadRequestError('Please provide a valid restaurantId.'));
    }
    if (restaurant.status === restaurantStatus.inactive) {
      return next(new BadRequestError('Please provide an active restaurant.'));
    }

    await Menu.create(req.body);

    res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};

const getMenus = async (req, res, next) => {
  try {
    const query =
        Object.keys(req.query).length > 0
          ? convertFilterToQuery(req.query)
          : { deleted: false },
      menus = await Menu.find(query)
        .populate('restaurantId')
        .populate({ path: 'usersGoing', select: '-role -status' });

    res.send({ menus });
  } catch (error) {
    return next(error);
  }
};

const notifyMenu = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const orders = await Order.find({
      status: orderStatus.active,
      menuId: _id,
      type: courseRequiredType.takeaway,
    }).populate({
      path: 'userId',
      populate: {
        path: 'devices',
      },
    });
    if (orders.length > 0) {
      let users = [];
      orders.forEach((order) => {
        users.push(order.userId);
      });

      sendNotification({
        users,
        notification: {
          title: 'Luch',
          color: '#FBBC00',
          body: 'Your office order arrived!',
        },
        data: {},
      });
    }

    res.sendStatus(202);
  } catch (error) {
    return next(error);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findOne({ _id: req.params._id });

    if (!menu || menu.deleted) {
      return next(new NotFoundError("Menu doesn't exist"));
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await Order.updateMany(
        { menuId: menu._id },
        { deleted: true },
        { session }
      );

      menu.deleted = true;
      await menu.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.sendStatus(204);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return next(new InternalServerError());
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createMenu,
  deleteMenu,
  getMenus,
  notifyMenu,
};
