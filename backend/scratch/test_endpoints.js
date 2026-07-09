/**
 * SCT Backend APIs automated testing script
 * Runs native Node.js HTTP queries without external dependencies
 */
const http = require('http');

const PORT = process.env.PORT || 5000;
const HOST = '127.0.0.1';

// Helper function to perform HTTP requests
const request = (method, path, body = null) => {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const options = {
      hostname: HOST,
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let rawData = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve({ status: res.statusCode, body: parsedData });
        } catch (e) {
          resolve({ status: res.statusCode, raw: rawData });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(postData);
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('🚀 Starting Automated API Endpoint Testing...');
  
  try {
    // 1. Test POST /api/contact
    console.log('\nTesting: POST /api/contact...');
    const contactData = {
      name: 'Test Contact User',
      email: 'testcontact@domain.com',
      phone: '+92 334 1122334',
      message: '[Test Subject] This is a test message to verify the contact API and database integration.'
    };
    
    const resPostContact = await request('POST', '/api/contact', contactData);
    console.log(`Status: ${resPostContact.status}`);
    console.log('Response:', resPostContact.body);
    
    if (resPostContact.status !== 201 || !resPostContact.body.success) {
      throw new Error('POST /api/contact failed!');
    }
    const createdContactId = resPostContact.body.data._id;
    console.log(`✅ Success: Contact created with ID: ${createdContactId}`);

    // 2. Test POST /api/internship
    console.log('\nTesting: POST /api/internship...');
    const inquiryData = {
      name: 'Test Intern Candidate',
      email: 'candidate@domain.com',
      whatsapp: '+92 331 9988776',
      department: 'Web Development',
      message: 'Hello SCT Team! I am interested in joining as a Web Development intern in the Summer 2026 cohort.'
    };
    
    const resPostInquiry = await request('POST', '/api/internship', inquiryData);
    console.log(`Status: ${resPostInquiry.status}`);
    console.log('Response:', resPostInquiry.body);
    
    if (resPostInquiry.status !== 201 || !resPostInquiry.body.success) {
      throw new Error('POST /api/internship failed!');
    }
    const createdInquiryId = resPostInquiry.body.data._id;
    console.log(`✅ Success: Internship inquiry created with ID: ${createdInquiryId}`);

    // 3. Test GET /api/admin/contacts
    console.log('\nTesting: GET /api/admin/contacts...');
    const resGetContacts = await request('GET', '/api/admin/contacts');
    console.log(`Status: ${resGetContacts.status}`);
    console.log(`Count: ${resGetContacts.body.count}`);
    
    if (resGetContacts.status !== 200 || !resGetContacts.body.success) {
      throw new Error('GET /api/admin/contacts failed!');
    }
    console.log('✅ Success: Received contacts from database.');

    // 4. Test GET /api/admin/inquiries
    console.log('\nTesting: GET /api/admin/inquiries...');
    const resGetInquiries = await request('GET', '/api/admin/inquiries');
    console.log(`Status: ${resGetInquiries.status}`);
    console.log(`Count: ${resGetInquiries.body.count}`);
    
    if (resGetInquiries.status !== 200 || !resGetInquiries.body.success) {
      throw new Error('GET /api/admin/inquiries failed!');
    }
    console.log('✅ Success: Received inquiries from database.');

    console.log('\n🎉 ALL API ENDPOINT TESTS PASSED SUCCESSFULLY! 🎉');
  } catch (error) {
    console.error('\n❌ Test Suite Failed:', error.message);
    process.exit(1);
  }
};

runTests();
