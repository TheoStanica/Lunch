const Notification = require('./model');

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user.id });
    res.send({ notifications });
  } catch (error) {
    return next(error);
  }
};

const updateNotification = async (req, res, next) => {
  try {
    res.send(200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getNotifications,
  updateNotification,
};
