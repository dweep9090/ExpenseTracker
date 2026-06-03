# Expense Tracker

A full-stack Expense Tracker application built using the MERN stack (MongoDB, Express.js, React, Node.js). The application allows users to register, log in securely using JWT authentication, and manage their personal expenses through a clean dashboard interface.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Persistent Login using Local Storage

### Expense Management

* Create Expense
* View Expenses
* Update Expense
* Delete Expense
* Expense Summary Dashboard

### Dashboard Summary

* Total Expenses
* Total Entries
* Highest Expense

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

## Project Structure

```text
ExpenseTracker/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/dweep9090/ExpenseTracker.git
cd ExpenseTracker
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/expense-tracker
JWT_SECRET=your_secret_key
PORT=5000
```

Start Backend Server:

```bash
npm run dev
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

Backend will run on:

```text
http://localhost:5000
```

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Expenses

```http
GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```


## Future Improvements

* Expense Category Filtering
* Expense Search
* Monthly Expense Analytics
* Charts and Graphs
* Budget Tracking
* Dark Mode
* Deployment using Render and Vercel

## Author

Dweep Kotecha

GitHub: https://github.com/dweep9090
