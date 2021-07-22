const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const Restaurant = require('./model');

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
    const { _id } = req.params;

    const restaurant = await Restaurant.findOne({ _id });

    if (!restaurant || restaurant.deleted) {
      return next(new NotFoundError("Restaurant doesn't exist"));
    }

    await Restaurant.findByIdAndUpdate(_id, { deleted: true });

    res.sendStatus(204);
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
