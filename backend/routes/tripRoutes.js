const express = require("express");

const { searchTrip } = require("../controllers/tripController");
const { optionalAuth } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/trips/search?from=Kalanki&to=Koteshwor&fareType=standard
router.get("/search", optionalAuth, searchTrip);

module.exports = router;
