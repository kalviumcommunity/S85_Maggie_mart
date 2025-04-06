const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ProductName: { type: String, required: true },
  Price: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  RoomNumber: { type: String, required: true },
  Contact: { type: Number, required: true }
});

module.exports = mongoose.model('Sell', ProductSchema);