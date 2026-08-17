const express = require("express");

const {
  getRecentSearches,
  clearSearchHistory,
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/personalController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All personal-space routes require login
router.use(protect);

router.get("/search-history", getRecentSearches);
router.delete("/search-history", clearSearchHistory);

router.get("/favorites", getFavorites);
router.post("/favorites", addFavorite);
router.delete("/favorites/:routeId", removeFavorite);

module.exports = router;
