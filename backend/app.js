const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const routeRoutes = require("./routes/routeRoutes");
const userRoutes = require("./routes/userRoutes");
const tripRoutes = require("./routes/tripRoutes");
const locationRoutes = require("./routes/locationRoutes");
const { vehicleTypeRoutes, operatorRoutes } = require("./routes/lookupRoutes");
const personalRoutes = require("./routes/personalRoutes");
const contactRoutes = require("./routes/contactRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Security headers
app.use(helmet());

// Middleware
app.use(cors());
app.use(express.json());

// Rate limit auth endpoints specifically (brute-force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: {
    success: false,
    message: "Too many attempts. Please try again later.",
  },
});
app.use("/api/auth", authLimiter);

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});
app.use("/api", apiLimiter);

// Test API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FollowMyRoute API is running",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/vehicle-types", vehicleTypeRoutes);
app.use("/api/operators", operatorRoutes);
app.use("/api/me", personalRoutes);
app.use("/api/contact-messages", contactRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Centralized error handler (must be last)
app.use(errorMiddleware);

module.exports = app;
