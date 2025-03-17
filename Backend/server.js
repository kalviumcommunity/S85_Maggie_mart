require('dotenv').config({ path: './config/.env' });
console.log('DB_URI:', process.env.DB_URI);  // Debugging line to see if DB_URI is loaded
console.log('Current Working Directory:', process.cwd());  // Check the working directory

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Check if DB_URI is undefined or empty
if (!process.env.DB_URI) {
  console.error('DB_URI is missing in .env');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

const db = mongoose.connection;

// Event listeners for database connection
db.on('error', (err) => console.error('MongoDB Connection Error:', err));
db.once('open', () => console.log('Connected to MongoDB successfully'));

// Home Route - Displays DB connection status
app.get('/', (req, res) => {
  res.json({ dbStatus: db.readyState === 1 ? 'Connected' : 'Not Connected' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
