const InternalServerError = require('../errors/internalServerError');
const Device = require('./model');
const User = require('../user/model');

const createDevice = async (req, res, next) => {
  try {
    const { fcmToken } = req.body;

    const token = await Device.find({ fcmToken });
    if (!token) {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const device = await Device.create(
          { user: req.user.id, fcmToken },
          { session }
        );

        await User.findByIdAndUpdate(
          req.user.id,
          {
            $push: { devices: device.id },
          },
          { session }
        );

        res.sendStatus(204);
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return next(new InternalServerError());
      }
    }

    res.send(201);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createDevice,
};
