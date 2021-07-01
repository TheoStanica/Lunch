const express = require('express');

const api = require('./src/index');
const db = require('./databsaseConnection');

const app = express();

// Setup common middlewares
app.use(express.json());

// Load database
db.connectDB();

// Register api
app.use('/src', api);

app.all('*', (req, res) => {
  res.send('it works');
});

module.exports = app;
