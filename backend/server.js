const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);

// Serve Admin static files under /admin
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

// Serve main static frontend files from the parent root directory
app.use(express.static(path.join(__dirname, '../')));

// Fallback to index.html for undefined frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Port configuration for local standalone execution
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(` SCT Backend Server running on port ${PORT}`);
    console.log(` Admin Dashboard: http://localhost:${PORT}/admin`);
    console.log(` Main Landing Page: http://localhost:${PORT}/`);
    console.log(`==================================================`);
  });
}

module.exports = app;
