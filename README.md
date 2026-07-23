# TravelEase — Backend

Backend REST API for **TravelEase**, a travel booking platform. Built with **Node.js**, **Express**, and **MongoDB**, handling user authentication, travel package bookings, and reviews. Powers the **TravelEase frontend** (React + Vite).

## Features

- User signup and login with **JWT-based authentication**
- Passwords hashed with **bcrypt** — never stored in plain text
- Protected routes for actions that require a logged-in user (e.g. creating a booking)
- Travel package bookings with search by location, cost range, and status
- Review system linked to users and bookings

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose
- **Auth:** JSON Web Tokens (`jsonwebtoken`) + `bcryptjs`

## Project Structure├── app.js # Entry point, route mounting
├── config/
│ └── db.js # MongoDB connection
├── controllers/
│ ├── userController.js # Signup, login, logout, profile, user bookings
│ ├── bookingController.js # CRUD + search for bookings
│ └── reviewController.js # CRUD for reviews
├── middleware/
│ └── authMiddleware.js # JWT verification (protect)
├── models/
│ ├── userModel.js
│ ├── bookingModel.js
│ └── reviewModel.js
└── routes/
├── userRoutes.js
├── bookingRoutes.js
└── reviewRoutes.js## Setup

1. Clone the repo and install dependencies:
```bash
   npm install
```

2. Create a `.env` file in the project root:
   MONGO_URI=your_mongodb_connection_string
  PORT=3001
  JWT_SECRET=your_secret_key
   **Never commit this file** — it's already listed in `.gitignore`.

3. Run the server:
```bash
   npm run dev
```
   Server starts on `http://localhost:3001`.

## API Endpoints

### Users (`/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| POST | `/add` | Register a new user | No |
| POST | `/login` | Log in, returns JWT | No |
| POST | `/logout` | Log out (client discards token) | No |
| GET | `/profile` | Get logged-in user's profile | **Yes** |
| GET | `/all` | Get all users | No |
| GET | `/:userId/bookings` | Get a user's bookings | No |

### Bookings (`/bookings`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| GET | `/all` | Get all bookings | No |
| GET | `/search/location/:loc` | Search bookings by location | No |
| GET | `/search/cost?min=&max=` | Search bookings by cost range | No |
| GET | `/search/state/:status` | Search bookings by status | No |
| GET | `/search/:id` | Get a booking by ID | No |
| POST | `/add` | Create a booking | **Yes** |
| PATCH | `/update/:id` | Update a booking | **Yes*** |
| DELETE | `/delete/:id` | Delete a booking | **Yes*** |

*\*Requires adding `protect` middleware to these routes.*

### Reviews (`/reviews`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| GET | `/all` | Get all reviews | No |
| POST | `/add` | Add a review | No |
| GET | `/:id` | Get a review by ID | No |
| PATCH | `/update/:id` | Update a review | No |
| DELETE | `/delete/:id` | Delete a review | No |

## Authentication

Protected routes expect a **Bearer token** in the request header:
Authorization: Bearer <your_jwt_token>

Tokens are issued on `/users/login` and expire after **1 day**.

