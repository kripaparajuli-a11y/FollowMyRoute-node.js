const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const routeRoutes = require("./routes/routeRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


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


// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});


module.exports = app;