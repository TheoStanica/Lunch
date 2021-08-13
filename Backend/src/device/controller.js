const InternalServerError = require('../errors/internalServerError');
const mongoose = require('mongoose');
const Device = require('./model');
const User = require('../user/model');

const createDevice = async (req, res, next) => {
  try {
    const { fcmToken } = req.body;
    const token = await Device.find({ fcmToken, user: req.user.id });

    if (Object.keys(token).length === 0) {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const device = await Device.create([{ user: req.user.id, fcmToken }], {
          session: session,
        });

        await User.findByIdAndUpdate(
          req.user.id,
          {
            $push: { devices: device[0].id },
          },
          { session: session }
        );

        await session.commitTransaction();
        session.endSession();
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return next(new InternalServerError());
      }
    }
    res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createDevice,
};
