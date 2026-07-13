const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('../backend/config/db');
const apiRoutes = require('../backend/routes/api');
const adminRoutes = require('../backend/routes/admin');

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register Serverless API Routes
app.use('/api/admin', adminRoutes);
app.use('/api', apiRoutes);

module.exports = app;
