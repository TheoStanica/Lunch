const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('mongoDB database connection successful');
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { connectDB };
