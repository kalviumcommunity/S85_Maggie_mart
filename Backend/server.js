require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
if (!process.env.DB_URI) {
  console.error('DB_URI is missing in .env');
  process.exit(1);
}

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

const sell = require('./models/sell');

app.get('/', (req, res) => {
  res.json({ dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected' });
});

// Create (Sell an Item)
app.post('/sell', async (req, res) => {
  try {
    const { ProductName, Price, Quantity, RoomNumber, Contact } = req.body;

    if (!ProductName || !Price || !Quantity || !RoomNumber || !Contact) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const created = await sell.create({ ProductName, Price, Quantity, RoomNumber, Contact });
    res.status(201).json(created);

  } catch (err) {
    console.error("❌ Error adding product:", err.message);
    return res.status(500).json({ error: "Internal server error", message: err.message });
  }
});

// Read (Get all Sell Items)
app.get('/products', async (req, res) => {
  try {
    const products = await sell.find(); // ✅ Using sell model
    return res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    return res.status(500).json({ error: "Failed to fetch products", message: err.message });
  }
});

// Server Start
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
