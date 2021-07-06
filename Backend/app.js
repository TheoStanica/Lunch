const express = require('express');

const api = require('./src/index');
const db = require('./databsaseConnection');
const BadRequestError = require('./src/errors/badRequestError');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// Setup common middlewares
app.use(express.json());

// Load database
db.connectDB();

// Register api
app.use('/api', api);

app.all('*', (req, res) => {
  throw new BadRequestError();
});

app.use(errorHandler);

module.exports = app;
