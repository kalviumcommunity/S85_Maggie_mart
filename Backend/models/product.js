const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String, // URL to image
  sellerName: String, // Optional
  hostel: String,     // Optional
});

module.exports = mongoose.model('Product', ProductSchema);
