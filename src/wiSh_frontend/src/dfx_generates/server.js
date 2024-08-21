const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Setup multer for file uploads
const upload = multer({
  limits: {
    fileSize: 180 * 180 * 4 // 180x180 pixels, 4 bytes per pixel
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a JPG, JPEG, or PNG image.'));
    }
    cb(null, true);
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory store for settings
let userSettings = {
  theme: 'light',
  notifications: true,
  language: 'English',
  profilePicture: ''
};

// Get settings
app.get('/settings', (req, res) => {
  res.json(userSettings);
});

// Save settings
app.post('/settings', upload.single('profilePicture'), (req, res) => {
  const settings = JSON.parse(req.body.settings);
  userSettings = {
    ...settings,
    profilePicture: req.file ? `/uploads/${req.file.filename}` : userSettings.profilePicture
  };
  res.status(200).json(userSettings);
});

// Serve static files for profile pictures
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
