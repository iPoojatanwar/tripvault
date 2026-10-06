 TripVault
A full-stack travel memory journal built with the MERN stack.
TripVault allows users to create accounts, save their travel experiences, upload trip images, manage travel memories, and share their experiences through public profiles.
 About
TripVault was developed as part of the CodGen Full Stack Internship.
The project demonstrates a complete full-stack application with:
User authentication and authorization
JWT-based protected routes
User profiles
Trip CRUD operations
Trip ownership protection
Image uploads
Public travel profiles
Responsive UI
REST API integration
MongoDB database integration
Environment-based configuration
Production deployment setup
 Features
Authentication
User registration and login
Password hashing with bcryptjs
JWT authentication
Protected routes
Logout functionality

Form validation

Loading and error states

Toast notifications

 User Profile

Username

Full name

Email

Bio

Personal profile

Public profile using username

Display total number of trips

Display user's travel memories

 Trip Management

Create trips

View personal trips

View trip details

Update trips

Delete trips

Trip ownership protection

Trip rating from 1–5

Loading and empty states

Responsive dashboard

 Image Management

Upload cover images

Upload multiple trip photos

Preview selected images

Remove selected photos

Preserve existing images while updating

Add new images while updating

 Public Profiles

Users can share their travel memories through a public profile.

Public profiles display:

User information

Bio

Total trips

Travel destinations

Trip dates

Ratings

Cover images

Additional trip photos

 Tech Stack
Frontend

React

Vite

React Router

Axios

Tailwind CSS

DaisyUI

React Hot Toast

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcryptjs

Multer

Cloudinary

CORS

dotenv

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Repository: GitHub



 API Routes
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get logged-in user
Trips
Method	Endpoint	Description
POST	/api/trip/	Create trip
GET	/api/trip/allTrips	Get user's trips
GET	/api/trip/:id	Get trip
PUT	/api/trip/:id	Update trip
DELETE	/api/trip/:id	Delete trip
Public Profile
Method	Endpoint	Description
GET	/api/users/:username/profile	Get public profile

Protected endpoints require a valid JWT.

Security

TripVault uses JWT-based authentication and authorization.

Passwords are hashed using bcryptjs.

JWT tokens are used to authenticate protected requests.

Trip ownership is checked before modifying or deleting trips.

Sensitive configuration is stored using environment variables.

Database credentials and secrets are not stored in source code.

Example ownership check:

{
  _id: req.params.id,
  user: req.user.id
}

 Environment Variables
Backend

Create .env inside the server directory:

PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173

Frontend

Create .env inside the client directory:

VITE_API_URL=http://localhost:5000/api


For production, VITE_API_URL should contain the deployed Render backend URL.

Never commit .env files to GitHub.

Local Development
1. Clone the repository
git clone https://github.com/iPoojatanwar/TripVault.git
cd TripVault

2. Start the backend
cd server
npm install
npm run dev


Backend:

http://localhost:5000

3. Start the frontend

Open another terminal:

cd client
npm install
npm run dev


Frontend:

http://localhost:5173

 Deployment

TripVault uses a separate frontend and backend deployment architecture:

User
  ↓
Vercel
  ↓
React Frontend
  ↓
Render
  ↓
Express API
  ↓
MongoDB Atlas

Frontend

The React application is deployed using Vercel.

Production environment variable:

VITE_API_URL=https://your-backend.onrender.com/api

Backend

The Express API is deployed using Render.

Production environment variables include:



Database

MongoDB Atlas is used as the production database.

The MongoDB connection string is stored securely in the backend environment variables.

Testing

Backend APIs can be tested using Postman.

Main areas tested:

User registration

User login

Authentication

Trip creation

Trip retrieval

Trip update

Trip deletion

Public profiles

Protected routes

 Responsive Design

The frontend is built with responsive layouts using Tailwind CSS and supports:

Mobile devices

Tablets

Laptops

Desktop screens

 What I Learned

Through this project, I gained practical experience with:

Building REST APIs with Express.js

MongoDB and Mongoose

JWT authentication and authorization

Password hashing with bcryptjs

Protected routes

CRUD operations

Trip ownership authorization

React state management

Axios API integration

Multipart form data

Image uploads

Responsive UI development

Public user profiles

Environment variables

API testing with Postman

MongoDB Atlas

Vercel deployment

Render deployment

Frontend and backend integration

 Project Outcome

TripVault demonstrates a complete MERN application combining:

Authentication → Authorization → CRUD → Image Uploads → Public Profiles → MongoDB → Production Deployment

The project provided practical experience in developing and preparing a real-world full-stack application for deployment.

 Developer

Pooja Tanwar

CodGen Full Stack Internship

Project: TripVault – Travel Memory Journal