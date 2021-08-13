const { Router } = require('express');
const apiRouter = new Router();

const userRoutes = require('./user/routes');
const restaurantRoutes = require('./restaurant/routes');
const orderRoutes = require('./order/routes');
const menuRoutes = require('./menu/routes');
const notificationRoutes = require('./notification/routes');
const deviceRoutes = require('./device/routes');

apiRouter.get('/deeplink/:_path*', (req, res) => {
  res.redirect(`lunchapp://${req.params._path}${req.params[0]}`);
});

apiRouter.use('/user', userRoutes);
apiRouter.use('/restaurant', restaurantRoutes);
apiRouter.use('/order', orderRoutes);
apiRouter.use('/menu', menuRoutes);
apiRouter.use('/notification', notificationRoutes);
apiRouter.use('/device', deviceRoutes);

module.exports = apiRouter;
