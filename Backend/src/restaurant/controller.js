const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const InternalServerError = require('../errors/internalServerError');
const Restaurant = require('./model');
const Menu = require('../menu/model');
const Order = require('../order/model');
const mongoose = require('mongoose');

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
    const { _id } = req.params;

    const restaurant = await Restaurant.findById({ _id });

    if (!restaurant || restaurant.deleted) {
      return next(new NotFoundError("Restaurant doesn't exist."));
    }

    if (restaurant.deleted) {
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
    const { _id } = req.params;
    const { name, cost, status, cancelAt, notifyAfter } = req.body;

    const restaurant = await Restaurant.findById(_id);

    if (!restaurant || restaurant.deleted) {
      return next(new NotFoundError("Restaurant doesn't exist."));
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurant.id,
      {
        name: name || restaurant.name,
        cost: cost || restaurant.cost,
        status: status || restaurant.status,
        notifyAfter: notifyAfter || restaurant.notifyAfter,
        cancelAt: cancelAt || restaurant.cancelAt,
      },
      { new: true }
    );

    res.send(updatedRestaurant);
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
