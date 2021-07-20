const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const Restaurant = require('../restaurant/model');
const Menu = require('./model');

const createMenu = async (req, res, next) => {
  try {
    const { restaurantId } = req.body;

    if (!(await Restaurant.findById(restaurantId))) {
      return next(new BadRequestError('Please provide a valid restaurantId'));
    }

    await Menu.create(req.body);

    res.sendStatus(201);
  } catch (error) {
    return next(error);
  }
};
const updateMenu = async (req, res, next) => {
  try {
    const { _id } = req.params;

    res.send();
  } catch (error) {
    return next(error);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const menu = await Menu.findOne({ _id });

    if (!menu) {
      return next(new NotFoundError("Menu doesn't exist"));
    }

    await Menu.findByIdAndDelete(_id);

    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createMenu,
  updateMenu,
  deleteMenu,
};
