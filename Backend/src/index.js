const { Router } = require('express');
const errorHandler = require('./middleware/errorHandler');
const apiRouter = new Router();

const userRoutes = require('./user/routes');

apiRouter.use('/user', userRoutes);
apiRouter.use(errorHandler);

module.exports = apiRouter;
