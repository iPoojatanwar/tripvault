# ✈️ TripVault

A full-stack travel memory journal built with the MERN stack.

## 📌 About

TripVault is a MERN stack project developed as part of the **CodGen Full Stack Internship — Week 1**.

This week's focus was **Project Setup & Authentication**.

## 🚀 Features

* User registration
* User login
* Password hashing with bcrypt
* JWT authentication
* Protected dashboard
* User profile
* Logout
* Form validation
* Responsive CSS

## 🛠️ Tech Stack

**Frontend:** React, Vite, React Router, Axios, CSS

**Backend:** Node.js, Express.js, MongoDB, Mongoose, bcryptjs, JWT

## 📁 Structure
TripVault/
├── client/
├── server/
├── .gitignore
└── README.md

## 🔌 API Routes

| Method | Route                | Purpose            |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/register` | Register user      |
| POST   | `/api/auth/login`    | Login user         |
| GET    | `/api/auth/me`       | Get logged-in user |

## ⚙️ Setup

### Backend
cd server
npm install
npm run dev

### Frontend
cd client
npm install
npm run dev

Create a `.env` file inside `server`:
PORT=5000
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_secret


**Do not upload `.env` to GitHub.**

## 🧪 Authentication Flow


Register → Login → Dashboard → Logout


## 💡 What I Learned

* Building REST APIs with Express
* Connecting MongoDB with Mongoose
* Password hashing with bcrypt
* JWT authentication
* Protected routes in React
* Connecting frontend and backend using Axios

## 👨‍💻 Developer

**Pooja Tanwar**

CodGen Full Stack Internship — Week 1
