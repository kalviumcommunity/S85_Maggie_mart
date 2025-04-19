const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ProductName: { type: String, required: true },
  Price: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  RoomNumber: { type: String, required: true },
  Contact: { type: Number, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
});

module.exports = mongoose.model('Sell', ProductSchema);