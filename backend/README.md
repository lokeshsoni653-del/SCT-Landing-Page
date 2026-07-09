# SCT Backend API & Database Setup Guide

This is the backend system for the **Students Club Tharparkar (SCT)** website. It provides REST API endpoints to receive, validate, and store contact submissions and internship inquiries in a MongoDB database. It also serves a unified **Admin Data View** dashboard for managing submissions.

---

## 🛠️ Tech Stack
* **Runtime:** Node.js (v16+)
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Testing:** Postman / Native test suite

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Navigate to the `backend` directory in your command line and run:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to a new file named `.env`:
```bash
cp .env.example .env
```
Open `.env` and configure your settings:
* **Local Database:** If you have MongoDB running locally, the default `mongodb://127.0.0.1:27017/sct_db` connection string will work automatically.
* **Cloud Database (MongoDB Atlas - Recommended):** If you do not have MongoDB installed locally, create a free database at [mongodb.com](https://www.mongodb.com/cloud/atlas) and replace the connection string:
  ```env
  PORT=5000
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sct_db?retryWrites=true&w=majority
  ```

### 3. Start the Server
* **Production Mode:**
  ```bash
  npm start
  ```
* **Development Mode (Auto hot-reload):**
  ```bash
  npm run dev
  ```
On success, you will see:
```text
==================================================
 SCT Backend Server running on port 5000
 Admin Dashboard: http://localhost:5000/admin
 Main Landing Page: http://localhost:5000/
==================================================
```

---

## 🔌 API Documentation

### 1. Contact Form API
* **Endpoint:** `POST /api/contact`
* **Description:** Receives and saves general website contact inquiries.
* **Request Headers:** `Content-Type: application/json`
* **Request Body Example:**
  ```json
  {
    "name": "Lokesh Kumar",
    "email": "lokesh@domain.com",
    "phone": "+92 334 1234567",
    "message": "Hi SCT Team! I would like to volunteer for the upcoming public presentation bootcamp."
  }
  ```
* **Response (211 Created):**
  ```json
  {
    "success": true,
    "message": "Contact message submitted successfully",
    "data": {
      "_id": "603fde22b512a831e0f0c112",
      "name": "Lokesh Kumar",
      "email": "lokesh@domain.com",
      "phone": "+92 334 1234567",
      "message": "Hi SCT Team! I would like to volunteer for the upcoming public presentation bootcamp.",
      "createdAt": "2026-07-09T13:20:10.500Z"
    }
  }
  ```

### 2. Internship Inquiry API
* **Endpoint:** `POST /api/internship`
* **Description:** Receives inquiries from students interested in SCT internships.
* **Request Headers:** `Content-Type: application/json`
* **Request Body Example:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@domain.com",
    "whatsapp": "+92 331 9988776",
    "department": "Web Development",
    "message": "I would like to inquire about the eligibility criteria for the Web Dev internship cohort starting next month."
  }
  ```
* **Response (211 Created):**
  ```json
  {
    "success": true,
    "message": "Internship inquiry submitted successfully",
    "data": {
      "_id": "603fde22b512a831e0f0c115",
      "name": "Jane Doe",
      "email": "jane.doe@domain.com",
      "whatsapp": "+92 331 9988776",
      "department": "Web Development",
      "message": "I would like to inquire about the eligibility criteria for the Web Dev internship cohort starting next month.",
      "createdAt": "2026-07-09T13:22:48.100Z"
    }
  }
  ```

### 3. Admin Data Retrievals
* **Endpoints:**
  * `GET /api/admin/contacts` — Retrieve all contact messages (sorted by newest).
  * `GET /api/admin/inquiries` — Retrieve all internship inquiries (sorted by newest).
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [ ... ]
  }
  ```

### 4. Admin Record Management
* **Endpoints:**
  * `DELETE /api/admin/contacts/:id` — Delete a specific contact message by ID.
  * `DELETE /api/admin/inquiries/:id` — Delete a specific internship inquiry by ID.
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Record deleted successfully"
  }
  ```

---

## 💻 Admin Data View Dashboard
You can access the built-in visual data portal directly in your browser:
🔗 **[http://localhost:5000/admin](http://localhost:5000/admin)**

**Features:**
* **Tabbed Viewports:** Switch instantly between the **Internship Inquiries** list and **Contact Messages** list.
* **Real-time Data Pulls:** Click **"Refresh Data"** to query APIs dynamically.
* **Export Utilities:** Download all filtered database records directly as local `.csv` files.
* **Data Management:** Delete records with a click, syncing state updates immediately.
