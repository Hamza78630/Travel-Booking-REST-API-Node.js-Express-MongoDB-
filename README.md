TravelEase — Backend

Backend REST API for TravelEase, a travel booking platform. Built with Node.js, Express, and MongoDB, handling user authentication, travel package bookings, and reviews. Powers the TravelEase frontend (React + Vite).

Features
User signup and login with JWT-based authentication
Passwords hashed with bcrypt — never stored in plain text
Protected routes for actions that require a logged-in user (e.g. creating a booking)
Travel package bookings with search by location, cost range, and status
Review system linked to users and bookings
Tech Stack
Runtime: Node.js (ES Modules)
Framework: Express 5
Database: MongoDB with Mongoose
Auth: JSON Web Tokens (jsonwebtoken) + bcryptjs
Project Structure

app.js — Entry point, route mounting
config/db.js — MongoDB connection
controllers/userController.js — Signup, login, logout, profile, user bookings
controllers/bookingController.js — CRUD + search for bookings
controllers/reviewController.js — CRUD for reviews
middleware/authMiddleware.js — JWT verification (protect)
models/userModel.js
models/bookingModel.js
models/reviewModel.js
routes/userRoutes.js
routes/bookingRoutes.js
routes/reviewRoutes.js

Setup
Clone the repo and install dependencies:
npm install
Create a .env file in the project root:
MONGO_URI=your_mongodb_connection_string
PORT=3001
JWT_SECRET=your_secret_key Never commit this file — it's already listed in .gitignore.
Run the server:
npm run dev Server starts on http://localhost:3001.
API Endpoints
Users (/users)
POST /add — Register a new user — No auth required
POST /login — Log in, returns JWT — No auth required
POST /logout — Log out (client discards token) — No auth required
GET /profile — Get logged-in user's profile — Auth required
GET /all — Get all users — No auth required
GET /:userId/bookings — Get a user's bookings — No auth required
Bookings (/bookings)
GET /all — Get all bookings — No auth required
GET /search/location/:loc — Search bookings by location — No auth required
GET /search/cost?min=&max= — Search bookings by cost range — No auth required
GET /search/state/:status — Search bookings by status — No auth required
GET /search/:id — Get a booking by ID — No auth required
POST /add — Create a booking — Auth required
PATCH /update/:id — Update a booking — Auth required (if you add protect here)
DELETE /delete/:id — Delete a booking — Auth required (if you add protect here)
Reviews (/reviews)
GET /all — Get all reviews — No auth required
POST /add — Add a review — No auth required
GET /:id — Get a review by ID — No auth required
PATCH /update/:id — Update a review — No auth required
DELETE /delete/:id — Delete a review — No auth required
Authentication

Protected routes expect a Bearer token in the request header:
Authorization: Bearer <your_jwt_token>

Tokens are issued on /users/login and expire after 1 day.
