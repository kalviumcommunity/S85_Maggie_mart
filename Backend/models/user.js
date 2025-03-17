const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  hostel_name: String,
  phone_number: String
});

module.exports = mongoose.model('User', UserSchema);
