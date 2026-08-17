# FollowMyRoute

FollowMyRoute is a MERN-stack web application for finding public transport routes (bus, micro bus, tempo, etc.) within the Kathmandu Valley. Users can search for a route between two stops, see fares, estimated travel time, and operating hours, save favorite routes, and view their recent search history. Administrators manage the underlying data (routes, stops/locations, vehicle types, operators) and view messages submitted through the contact form.

## Tech Stack

**Frontend**
- React 19 (Vite)
- React Router
- Tailwind CSS
- Axios
- React Icons
- Context API for authentication state

**Backend**
- Node.js + Express 5
- MongoDB with Mongoose
- JWT authentication (jsonwebtoken)
- Password hashing (bcryptjs)
- Security middleware: helmet, express-rate-limit, cors

## Project Structure

FollowMyRoute/
├── backend/
│   ├── config/          # DB connection setup
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic used by controllers
│   ├── models/          # Mongoose schemas (User, Route, Location, etc.)
│   ├── middleware/      # Auth (JWT) and centralized error handling
│   ├── routes/          # Express route definitions
│   ├── app.js           # Express app setup
│   └── index.js         # Server entry point
└── frontend/
    └── src/
        ├── components/  # Reusable UI (Navbar, Footer, sections, etc.)
        ├── context/     # AuthContext (global auth state)
        ├── pages/       # Route-level pages, including admin/ subpages
        ├── routes/      # AppRoutes, ProtectedRoute, AdminRoute
        └── services/    # Axios API client

## Features

- Authentication: register, login, forgot/reset password, JWT-based sessions
- Role-based access: normal users vs. admin, enforced in both the UI (ProtectedRoute/AdminRoute) and backend (protect/authorize("admin") middleware)
- Route search with direct and transfer results
- Fare calculation per stop, so any partial segment's fare can be computed
- Favorite routes and recent search history per user
- Admin dashboard: manage routes, locations, vehicle types, operators, users, contact messages
- Public contact form, viewable/deletable by admins
- Security: rate-limited auth endpoints, Helmet headers, hashed passwords

## API Overview

All endpoints prefixed with /api

- /api/auth — register, login, forgot-password, reset-password
- /api/routes — public read/search, admin-only write
- /api/trips/search — trip search by from/to
- /api/locations — public read, admin-only write
- /api/vehicle-types, /api/operators — public read, admin-only write
- /api/users — admin list, self/admin get & update, admin delete
- /api/me — search history and favorites (requires login)
- /api/contact-messages — public submit, admin-only view/delete

## Getting Started

1. Clone the repo
2. cd backend && npm install
3. Create backend/.env with MONGODB_URI, PORT, JWT_SECRET
4. npm run dev (backend)
5. cd frontend && npm install && npm run dev (frontend)

## Author

Kripa Parajuli — first MERN stack project, built as a final assignment for React/Node.js coursework.