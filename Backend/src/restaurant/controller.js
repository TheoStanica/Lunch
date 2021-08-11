const mongoose = require('mongoose');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const InternalServerError = require('../errors/internalServerError');
const Restaurant = require('./model');
const Menu = require('../menu/model');
const Order = require('../order/model');
const { restaurantStatus } = require('../utils/enums');

const createRestaurant = async (req, res, next) => {
  try {
    const { name, cost, cancelAt, notifyAfter } = req.body;

    await Restaurant.create({ name, cost, cancelAt, notifyAfter });

    res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};

const getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById({ _id: req.params._id });

    if (!restaurant || restaurant.deleted) {
      return next(new NotFoundError("Restaurant doesn't exist."));
    }
    if (restaurant.status === restaurantStatus.inactive) {
      return next(new BadRequestError('Restaurant is inactive.'));
    }

    res.send(restaurant);
  } catch (error) {
    return next(error);
  }
};

const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({ deleted: false });
    res.send(restaurants);
  } catch (error) {
    return next(error);
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const { name, cost, status, cancelAt, notifyAfter } = req.body;
    let restaurant = await Restaurant.findById({ _id: req.params._id });

    if (!restaurant || restaurant.deleted) {
      return next(new NotFoundError("Restaurant doesn't exist."));
    }

    restaurant.name = name || restaurant.name;
    restaurant.cost = cost || restaurant.cost;
    restaurant.status = status || restaurant.status;
    restaurant.notifyAfter = notifyAfter || restaurant.notifyAfter;
    restaurant.cancelAt = cancelAt || restaurant.cancelAt;
    await restaurant.save();

    res.send(restaurant);
  } catch (error) {
    return next(error);
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.params._id });

    if (!restaurant || restaurant.deleted) {
      return next(new NotFoundError("Restaurant doesn't exist"));
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const menus = await Menu.find({ restaurantId: restaurant._id }, null, {
        session,
      });

      for (let menu of menus) {
        await Order.updateMany(
          { menuId: menu._id },
          { deleted: true },
          { session }
        );
        menu.deleted = true;
        await menu.save({ session });
      }
      restaurant.deleted = true;
      await restaurant.save({ session });

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
  createRestaurant,
  getRestaurant,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
};
