const { Router } = require('express');
const apiRouter = new Router();

const userRoutes = require('./user/routes');

apiRouter.use('/user', userRoutes);

module.exports = apiRouter;
