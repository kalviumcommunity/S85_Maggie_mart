const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ProductName: String,
  Price: Number,
Quantity: Number,
  RoomNumber: String, // URL to image
  Contact: Number, // Optional
 
});

module.exports = mongoose.model('Sell', ProductSchema);
