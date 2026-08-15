const express = require("express");

const {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  searchRoutes,
} = require("../controllers/routeController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();


// Search routes
router.get("/search", searchRoutes);


// Get all routes
router.get("/", getAllRoutes);


// Get route by ID
router.get("/:id", getRouteById);


// Create route - admin
router.post(
  "/",
  protect,
  authorize("admin"),
  createRoute
);


// Update route - admin
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateRoute
);


// Delete route - admin
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteRoute
);


module.exports = router;