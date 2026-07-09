const mongoose = require('mongoose');

// Default to JSON mode immediately so early requests do not hang
global.dbMode = 'json';

// Disable buffering globally so mongoose operations fail fast instead of hanging if database drops
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sct_db';
    console.log(`Connecting to MongoDB at: ${connStr.replace(/:([^@]+)@/, ':****@')}`);
    
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2000 // 2 seconds timeout for instant fallback
    });
    
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    global.dbMode = 'mongodb';
  } catch (err) {
    console.warn(`\n⚠️  MongoDB Connection failed: ${err.message}`);
    console.warn(`⚠️  FALLING BACK TO LOCAL FILE DATABASE MODE (JSON Storage)`);
    console.warn(`⚠️  This enables out-of-the-box testing without installing MongoDB!`);
    console.warn(`⚠️  Submissions will be saved locally in backend/data/ folder.\n`);
    global.dbMode = 'json';
  }
};

module.exports = connectDB;
