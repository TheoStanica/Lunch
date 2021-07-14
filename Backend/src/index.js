const { Router } = require('express');
const apiRouter = new Router();

const userRoutes = require('./user/routes');
const restaurantRoutes = require('./restaurant/routes');

apiRouter.get('/deeplink/:_path*', (req, res) => {
  res.redirect(`lunchapp://${req.params._path}${req.params[0]}`);
});

apiRouter.use('/user', userRoutes);
apiRouter.use('/restaurant', restaurantRoutes);

module.exports = apiRouter;
