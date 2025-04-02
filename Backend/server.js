require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// MongoDB Connection
if (!process.env.DB_URI) {
  console.error('DB_URI is missing in .env');
  process.exit(1);
}

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

const Product = require('./models/product'); 
const sell = require('./models/sell')

app.get('/', (req, res) => {
  res.json({ dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected' });
});


app.post('/sell', async (req, res) => {
  try {
    const { ProductName, Price, Quantity, RoomNumber, Contact } = req.body;
 
    if (!ProductName || !Price || !Quantity || !RoomNumber || !Contact) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const create=await sell.create({
      ProductName, Price, Quantity, RoomNumber, Contact
    })
    res.status(201).json(create)

  } catch (err) {
    console.error("❌ Error adding product:", err.message);
    return res.status(500).json({ error: "Internal server error", message: err.message });
  }
});

// ✅ Get All Products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Exclude __v field
    return res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    return res.status(500).json({ error: "Failed to fetch products", message: err.message });
  }
});

// ✅ Server Start
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
