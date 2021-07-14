const BadRequestError = require('../errors/badRequestError');

const Restaurant = require('./model');
const NotFoundError = require('../errors/notFoundError');

const createRestaurant = async (req, res, next) => {
  try {
    const { name, cost } = req.body;

    if (await Restaurant.findOne({ name })) {
      return next(new BadRequestError('Restaurant already exists.'));
    }

    await Restaurant.create({ name, cost });

    res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};

const getRestaurant = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const restaurant = await Restaurant.findById({ _id });

    if (!restaurant) {
      return next(new NotFoundError("Restaurant doesn't exist."));
    }

    res.send(restaurant);
  } catch (error) {
    return next(error);
  }
};
const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({});
    res.send(restaurants);
  } catch (error) {
    return next(error);
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { name, cost } = req.body;

    const restaurant = await Restaurant.findById(_id);

    if (!restaurant) {
      return next(new NotFoundError("Restaurant doesn't exist."));
    }

    if (name && (await Restaurant.findOne({ name }))) {
      return next(new BadRequestError('Restaurant name already exists.'));
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurant.id,
      {
        name: name || restaurant.name,
        cost: cost || restaurant.cost,
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

    if (!restaurant) {
      return next(new NotFoundError("Restaurant doesn't exist"));
    }

    await Restaurant.findByIdAndDelete(_id);

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
