const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Contact = require('../models/Contact');
const Inquiry = require('../models/Inquiry');

const DATA_DIR = process.env.VERCEL ? path.join('/tmp', 'data') : path.join(__dirname, '../data');
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

// GET /api/admin/contacts - Fetch all contact messages
router.get('/contacts', async (req, res) => {
  try {
    if (global.dbMode === 'json') {
      const contacts = readJSON(CONTACTS_FILE).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts
      });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (err) {
    console.error('Error fetching contacts:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Server Error: Unable to retrieve submissions'
    });
  }
});

// GET /api/admin/inquiries - Fetch all internship inquiries
router.get('/inquiries', async (req, res) => {
  try {
    if (global.dbMode === 'json') {
      const inquiries = readJSON(INQUIRIES_FILE).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json({
        success: true,
        count: inquiries.length,
        data: inquiries
      });
    }

    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (err) {
    console.error('Error fetching inquiries:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Server Error: Unable to retrieve inquiries'
    });
  }
});

// DELETE /api/admin/contacts/:id - Delete a contact message
router.delete('/contacts/:id', async (req, res) => {
  try {
    if (global.dbMode === 'json') {
      let contacts = readJSON(CONTACTS_FILE);
      const initialLength = contacts.length;
      contacts = contacts.filter(item => item._id !== req.params.id);
      
      if (contacts.length === initialLength) {
        return res.status(404).json({
          success: false,
          error: 'Contact message not found'
        });
      }
      
      writeJSON(CONTACTS_FILE, contacts);
      return res.status(200).json({
        success: true,
        message: 'Contact message deleted successfully'
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact message not found'
      });
    }
    await contact.deleteOne();
    return res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting contact:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Server Error: Unable to delete record'
    });
  }
});

// DELETE /api/admin/inquiries/:id - Delete an internship inquiry
router.delete('/inquiries/:id', async (req, res) => {
  try {
    if (global.dbMode === 'json') {
      let inquiries = readJSON(INQUIRIES_FILE);
      const initialLength = inquiries.length;
      inquiries = inquiries.filter(item => item._id !== req.params.id);
      
      if (inquiries.length === initialLength) {
        return res.status(404).json({
          success: false,
          error: 'Internship inquiry not found'
        });
      }
      
      writeJSON(INQUIRIES_FILE, inquiries);
      return res.status(200).json({
        success: true,
        message: 'Internship inquiry deleted successfully'
      });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        error: 'Internship inquiry not found'
      });
    }
    await inquiry.deleteOne();
    return res.status(200).json({
      success: true,
      message: 'Internship inquiry deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting inquiry:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Server Error: Unable to delete record'
    });
  }
});

module.exports = router;
