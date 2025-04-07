require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

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

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log('Invalid product ID:', id); // Debugging
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const deletedProduct = await sell.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting product:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const updatedProduct = await sell.findByIdAndUpdate(id, updates, {
      new: true,
    });


    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('❌ Error updating product:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



const User = require('./models/user');

// Signup Route
app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ email, password, name });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful', name: newUser.name });
  } catch (err) {
    console.error('Error during signup:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, ()=>{
  console.log(`Server is running at ${PORT}`)
})

