const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db'); 
const playlistRoutes = require('./routes/playlistRoutes');
const videoRoutes = require('./routes/videoRoutes');

const paymentRoutes = require('./routes/paymentRoutes'); 
require('./workers/videoWorker'); 
const app = express();
const path = require('path');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, 
};
app.use(cors(corsOptions)); 

// Set CORS headers for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Apply CORS to static files
app.use('/uploads', cors(corsOptions), express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', authRoutes);
app.use('/api', playlistRoutes);
app.use('/api', videoRoutes);
app.use('/api/payment', paymentRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
