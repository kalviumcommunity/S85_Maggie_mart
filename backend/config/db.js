const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connecting to MongoDB without deprecated options
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit the process with an error code if connection fails
  }
};

module.exports = connectDB;
