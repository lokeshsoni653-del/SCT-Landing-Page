const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Contact = require('../models/Contact');
const Inquiry = require('../models/Inquiry');

const DATA_DIR = process.env.VERCEL ? path.join('/tmp', 'data') : path.join(__dirname, '../data');
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('Serverless filesystem notice:', e.message);
}

const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

const readJSON = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (e) {
    return [];
  }
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// POST /api/contact - Submit a contact message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Check required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, email, phone, message'
      });
    }

    if (global.dbMode === 'json') {
      const contacts = readJSON(CONTACTS_FILE);
      const newContact = {
        _id: 'json_contact_' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        phone,
        message,
        createdAt: new Date().toISOString()
      };
      contacts.push(newContact);
      writeJSON(CONTACTS_FILE, contacts);
      
      return res.status(201).json({
        success: true,
        message: 'Contact message saved to local JSON database',
        data: newContact
      });
    }

    const contact = new Contact({ name, email, phone, message });
    await contact.save();

    return res.status(201).json({
      success: true,
      message: 'Contact message submitted successfully',
      data: contact
    });
  } catch (err) {
    console.error('Error saving contact message:', err.message);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    return res.status(500).json({
      success: false,
      error: 'Server Error: Unable to save submission'
    });
  }
});

// POST /api/internship - Submit an internship inquiry
router.post('/internship', async (req, res) => {
  try {
    const { name, email, whatsapp, department, message } = req.body;

    // Check required fields
    if (!name || !email || !whatsapp || !department || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, email, whatsapp, department, message'
      });
    }

    if (global.dbMode === 'json') {
      const inquiries = readJSON(INQUIRIES_FILE);
      const newInquiry = {
        _id: 'json_inquiry_' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        whatsapp,
        department,
        message,
        createdAt: new Date().toISOString()
      };
      inquiries.push(newInquiry);
      writeJSON(INQUIRIES_FILE, inquiries);

      return res.status(201).json({
        success: true,
        message: 'Internship inquiry saved to local JSON database',
        data: newInquiry
      });
    }

    const inquiry = new Inquiry({ name, email, whatsapp, department, message });
    await inquiry.save();

    return res.status(201).json({
      success: true,
      message: 'Internship inquiry submitted successfully',
      data: inquiry
    });
  } catch (err) {
    console.error('Error saving internship inquiry:', err.message);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    return res.status(500).json({
      success: false,
      error: 'Server Error: Unable to save inquiry'
    });
  }
});

module.exports = router;
