const mongoose = require('mongoose');

// This function will handle the MongoDB connection
const connectDB = async () => {
  try {
    // Make sure you have the DB_URI variable in your .env file
    const dbURI = process.env.DB_URI;
    if (!dbURI) {
      throw new Error('DB_URI is not defined in .env');
    }

    // Connect to MongoDB using the URI
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the DB connection fails
  }
};

// Export the connection function for use in server.js
module.exports = connectDB;
