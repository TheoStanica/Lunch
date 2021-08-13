const express = require('express');

const api = require('./src/index');
const db = require('./databsaseConnection');
const NotFoundError = require('./src/errors/notFoundError');
const errorHandler = require('./src/middleware/errorHandler');
const admin = require('firebase-admin');
var serviceAccount = require('./firebaseCredentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Setup common middlewares
app.use(express.json());

// Load database
db.connectDB();

// Register api
app.use('/api', api);

app.all('*', (req, res) => {
  throw new NotFoundError('Route not found.');
});

app.use(errorHandler);

module.exports = app;
