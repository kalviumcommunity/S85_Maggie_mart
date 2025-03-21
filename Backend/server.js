require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
if (!process.env.DB_URI) {
  console.error('DB_URI is missing in .env');
  process.exit(1);
}

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB Connection Error:', err));
db.once('open', () => console.log('Connected to MongoDB successfully'));

// Routes
app.get('/', (req, res) => {
  res.json({ dbStatus: db.readyState === 1 ? 'Connected' : 'Not Connected' });
});

// Product Routes
const Product = require('./models/product');

// Create Product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product', details: err });
  }
});

// Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err });
  }
});

// Server Start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
