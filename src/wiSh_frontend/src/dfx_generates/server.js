const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000; // Ensure this port is available and not used by other services

app.use(cors());
app.use(bodyParser.json());

// In-memory store for settings
let userSettings = {
  theme: 'light',
  notifications: true,
  language: 'English'
};

// Get settings
app.get('/settings', (req, res) => {
  res.json(userSettings);
});

// Save settings
app.post('/settings', (req, res) => {
  userSettings = req.body;
  res.status(200).json(userSettings);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
