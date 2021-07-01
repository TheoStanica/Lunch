require('dotenv').config();

const app = require('./app');

// Listen for connections
app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}`);
});
