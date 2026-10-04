✈️ TripVault

A full-stack travel memory journal built with the MERN stack.

TripVault allows users to securely create accounts, save their travel experiences, upload trip images, manage their memories, and share their travel profiles.

📌 About

TripVault is a full-stack travel memory journal developed as part of the CodGen Full Stack Internship.

The project focuses on building a complete MERN application with:

User authentication

JWT-based authorization

User profiles

Trip CRUD operations

Trip ownership protection

Image uploads

Public travel profiles

Responsive UI

REST API integration

Users can register and log in securely, create travel memories, add destinations and ratings, upload cover images and additional photos, update their trips, and delete them when needed.

🚀 Features
🔐 Authentication

User registration

User login

Password hashing using bcrypt

JWT authentication

Protected routes

Logged-in user information

Logout functionality

Form validation

Loading and error states

Toast notifications

👤 User Profile

Username

Full name

Email

User bio

Personal profile page

Public profile using username

Display user's travel memories

Display total number of trips

🧳 Trip Management

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

📸 Trip Images

Upload a cover image

Upload multiple trip photos

Preview selected photos

Remove photos before submitting

Display cover image on trip details

Display additional trip photos

Preserve existing images while updating trips

🌐 Public Profile

Users can access a public profile through their username.

The public profile displays:

User name

Username

Bio

Total trips

Travel memories

Trip destinations

Trip dates

Trip ratings

Cover images

Additional trip photos

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
│   │   │
│   │   ├── Pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── PublicProfile.jsx
│   │   │
│   │   └── api/
│   │       └── axios.js
│   │
│   └── ...
│
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── tripController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── users.model.js
│   │   └── trips.model.js
│   │
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── tripRouter.js
│   │
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
POST	/api/trip/	Create a new trip
GET	/api/trip/allTrips	Get user's trips
GET	/api/trip/:id	Get a single trip
PUT	/api/trip/:id	Update a trip
DELETE	/api/trip/:id	Delete a trip
Public Profile
Method	Route	Purpose
GET	/api/users/:username/profile	Get a user's public profile
📋 User Model

Each user contains information such as:

name
username
email
password
bio


The password is securely hashed using bcryptjs before being stored in the database.

📋 Trip Model

Each trip contains:

title
destination
startDate
endDate
description
rating
coverImage
photos
user


The user field references the authenticated user who owns the trip.

🔐 Security

Trip routes are protected using JWT authentication.

After login, the server generates a JWT containing the user's ID. The frontend stores the token and sends it with protected API requests.

Users can only access and modify their own trips.

Ownership is verified before retrieving, updating, or deleting a trip.

For example:

{
  _id: req.params.id,
  user: req.user.id
}


This prevents one authenticated user from modifying another user's travel memories.

Passwords are never stored as plain text. They are hashed using:

bcrypt.hash(password, 10)

🔄 Application Flow
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
Upload Images
   ↓
View Trips
   ↓
View Trip Details
   ↓
Update Trip
   ↓
Delete Trip

Public Profile Flow
User Profile
   ↓
Username
   ↓
Public Profile
   ↓
User Bio
   ↓
Travel Memories
   ↓
Trip Images & Details

🖼️ Image Management

TripVault supports both cover images and multiple additional photos.

When creating a trip, users can:

Select a cover image

Select multiple photos

Preview selected photos

Remove unwanted photos

Submit images along with trip information

When updating a trip, existing images can be preserved while new images can be added.

⚙️ Setup
1. Clone the Repository
git clone https://github.com/iPoojatanwar
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


Do not upload your .env file to GitHub.

🧪 Testing

The backend APIs can be tested using Postman.

Test the following operations:

POST    /api/auth/register
POST    /api/auth/login
GET     /api/auth/me

POST    /api/trip/
GET     /api/trip/allTrips
GET     /api/trip/:id
PUT     /api/trip/:id
DELETE  /api/trip/:id

GET     /api/users/:username/profile


A valid JWT must be included when accessing protected routes.

💡 What I Learned

During this project, I learned how to:

Build REST APIs using Express.js

Create MongoDB schemas using Mongoose

Implement user registration and login

Hash passwords using bcrypt

Generate and verify JWT tokens

Create protected API routes

Implement authorization and trip ownership

Build complete CRUD functionality

Connect React forms with backend APIs

Manage API requests using Axios

Handle multipart form data and image uploads

Display image previews using URL.createObjectURL()

Manage and revoke temporary object URLs

Build responsive interfaces using Tailwind CSS

Create public user profiles

Connect users with their travel memories

Handle loading, error, and empty states

Use React state and useEffect for API-driven UI

Test APIs using Postman

Connect frontend and backend into a complete MERN application

🎯 Project Outcome

TripVault demonstrates a complete full-stack application where authentication, authorization, CRUD operations, user profiles, image management, and frontend-backend integration work together in one application.

The project helped strengthen my understanding of building real-world MERN applications from the database and REST API layer to the React frontend.

👨‍💻 Developer

Pooja Tanwar

CodGen Full Stack Internship

Project: TripVault – Travel Memory Journal