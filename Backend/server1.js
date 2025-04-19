const express = require('express');
require('dotenv').config();
const cors = require('cors');
const db = require('./config/db1');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('🔥 Express + MySQL server is connected and running!');
});

// Get all users
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        console.error('❌ Error fetching users:', err);
        return res.status(500).json([]); // send empty array
      }
      res.json(results);
    });
  });
  

// Get items created by a specific user
app.get('/api/items/:userId', (req, res) => {
    const { userId } = req.params;
    const query = 'SELECT * FROM items WHERE created_by = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error(`❌ Error fetching items for user ${userId}:`, err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
