const Agenda = require('agenda');
const User = require('../user/model');
const { sendNotification } = require('../utils/notificationSender');
const moment = require('moment');
const Order = require('../order/model');
const Menu = require('../menu/model');

const agenda = new Agenda({
  db: { address: process.env.MONGO_CONNECT, collection: 'Jobs' },
});
agenda
  .on('ready', () => console.log('Agenda started'))
  .on('error', () => console.log('Agenda connection error'));

const clear = async () => {
  console.log('disconnecting agenda from mongo');
  await agenda.purge();
  await agenda.stop();
  process.exit(0);
};

process.on('SIGTERM', clear);
process.on('SIGINT', clear);

const extractMinutesAndHours = (time) => {
  const _time = moment(time, 'h:mm a').format();
  const hour = moment(_time).hour();
  const minutes = moment(_time).minute();

  return { hour, minutes };
};

const cancelReminder = async (userId) => {
  await agenda.cancel({
    name: `initializeReminder-${userId}`,
  });
};

const defineReminder = async ({ userId }) => {
  await agenda.define(`initializeReminder-${userId}`, async (job) => {
    const today = new Date(moment().startOf('day'));
    const user = await User.findById(userId).populate('devices');
    const menu = await Menu.find({ createdAt: { $gte: today } });

    if (menu.length > 0) {
      const order = await Order.find({
        userId: userId,
        createdAt: { $gte: today },
      });

      if (order.length === 0) {
        sendNotification({
          users: [user],
          notification: {
            title: 'Luch',
            color: '#FBBC00',
            body: "You haven't made any orders today. Click here to make one!",
          },
          data: {},
        });
      }
    }
  });
};

const setReminderSchedule = async ({ userId, time }) => {
  const { hour, minutes } = extractMinutesAndHours(time);
  await agenda.every(
    // `15 seconds`,
    `${minutes} ${hour} * * 1-5`,
    `initializeReminder-${userId}`
  );
};

const setReminder = async ({ userId, time }) => {
  await defineReminder({ userId });
  await setReminderSchedule({ userId, time });
};

(async function () {
  await agenda.start();
  const users = await User.find().populate('devices');

  users.forEach(async (user) => {
    if (user.isReminderOn) {
      await setReminder({ userId: user.id, time: user.remindAt });
    }
  });
})();

module.exports = {
  agenda,
  extractMinutesAndHours,
  cancelReminder,
  setReminderSchedule,
  setReminder,
};
