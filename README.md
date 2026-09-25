✈️ TripVault

A full-stack travel memory journal built with the MERN stack.

📌 About

TripVault is a MERN stack project developed as part of the CodGen Full Stack Internship.

Week 2 — Trip Management & CRUD Operations

This week's focus was building complete Trip Management functionality. Authenticated users can create, view, update, and delete their own travel memories.

🚀 Features
Authentication

User registration

User login

Password hashing with bcrypt

JWT authentication

Protected routes

User profile

Logout

Form validation

Trip Management

Create a new trip

View all trips belonging to the logged-in user

View individual trip details

Update existing trips

Delete trips with confirmation

Trip ownership protection

Empty state when no trips exist

Loading states

Responsive dashboard

Trip rating from 1–5

🛠️ Tech Stack

Frontend

React

Vite

React Router

Axios

Tailwind CSS

React Hot Toast

Backend

Node.js

Express.js

MongoDB

Mongoose

bcryptjs

JSON Web Token (JWT)

📁 Project Structure
TripVault/
├── client/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TripCard.jsx
│   │   │   ├── TripForm.jsx
│   │   │   └── UpdateTrip.jsx
│   │   ├── Pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── api/
│   │       └── axios.js
│   └── ...
│
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── tripController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── trips.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── tripRouter.js
│   └── server.js
│
├── .gitignore
└── README.md

🔌 API Routes
Authentication
Method	Route	Purpose
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user and receive JWT
GET	/api/auth/me	Get logged-in user
Trip Management

All trip routes require a valid JWT.

Method	Route	Purpose
POST	/api/trips	Create a new trip
GET	/api/trips	Get all trips belonging to the logged-in user
GET	/api/trips/:id	Get a single trip
PUT	/api/trips/:id	Update a trip
DELETE	/api/trips/:id	Delete a trip
📋 Trip Model

Each trip contains:

title
destination
startDate
endDate
description
rating
user


The user field references the authenticated user who owns the trip.

🔐 Security

Trip routes are protected using JWT authentication.

Users can only access and modify their own trips.

Ownership is verified before retrieving, updating, or deleting a trip.

For example:

{
  _id: req.params.id,
  user: req.user.id
}


This prevents one authenticated user from modifying another user's travel memories.

🔄 Trip Flow
Register
   ↓
Login
   ↓
JWT Token
   ↓
Dashboard
   ↓
Create Trip
   ↓
View Trips
   ↓
Update Trip
   ↓
Delete Trip

⚙️ Setup
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd TripVault

2. Backend Setup
cd server
npm install
npm run dev


Create a .env file inside the server directory:

PORT=5000
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_secret

3. Frontend Setup

Open another terminal:

cd client
npm install
npm run dev


Do not upload .env to GitHub.

🧪 Testing

The Trip API can be tested using Postman.

Test the following operations:

POST    /api/trips
GET     /api/trips
GET     /api/trips/:id
PUT     /api/trips/:id
DELETE  /api/trips/:id


A valid JWT must be included when accessing protected routes.

💡 What I Learned

During Week 2, I learned:

Building CRUD APIs with Express

Creating Mongoose schemas and relationships

Connecting trips to authenticated users

Implementing ownership authorization

Creating protected REST API routes

Connecting React forms to backend APIs

Managing API requests with Axios

Building a responsive dashboard

Handling loading and error states

Implementing create, read, update, and delete operations

Testing APIs before connecting them to the frontend

👨‍💻 Developer

Pooja Tanwar

CodGen Full Stack Internship — Week 2