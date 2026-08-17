const express = require("express");

const {
  createLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Public: used for autocomplete on the "From"/"To" search fields
router.get("/", getAllLocations);

// Admin only: manage the master list of locations
router.post("/", protect, authorize("admin"), createLocation);
router.put("/:id", protect, authorize("admin"), updateLocation);
router.delete("/:id", protect, authorize("admin"), deleteLocation);

module.exports = router;
