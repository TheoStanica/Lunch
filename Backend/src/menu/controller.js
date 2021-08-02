const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const Restaurant = require('../restaurant/model');
const Menu = require('./model');

const convertFilterToQuery = (filter) => {
  const newFilter = { deleted: false };

  if (filter._id) {
    newFilter._id = filter._id;
  }

  if (filter.restaurantId) {
    newFilter.restaurantId = filter.restaurantId;
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

const getMenus = async (req, res, next) => {
  try {
    const query = req.query.filter
        ? convertFilterToQuery(JSON.parse(req.query.filter))
        : { deleted: false },
      menus = await Menu.find(query).populate('restaurantId');

    res.send({ menus });
  } catch (error) {
    return next(error);
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const { _id } = req.params,
      menu = await Menu.findOne({ _id });

    if (!menu || menu.deleted) {
      return next(new NotFoundError("Menu doesn't exist"));
    }

    await Menu.findByIdAndUpdate(_id, { deleted: true });

    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createMenu,
  deleteMenu,
  getMenus,
};
