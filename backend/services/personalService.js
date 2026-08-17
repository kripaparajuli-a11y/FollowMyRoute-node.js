const SearchHistory = require("../models/SearchHistory");
const FavoriteRoute = require("../models/FavoriteRoute");

// ---- Search history ----

const getRecentSearches = async (userId, limit = 10) => {
  return SearchHistory.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

const clearSearchHistory = async (userId) => {
  return SearchHistory.deleteMany({ user: userId });
};

// ---- Favorites ----

const addFavorite = async (userId, routeId, note = "") => {
  return FavoriteRoute.findOneAndUpdate(
    { user: userId, route: routeId },
    { user: userId, route: routeId, note },
    { new: true, upsert: true, runValidators: true }
  ).populate({
    path: "route",
    populate: [
      { path: "vehicleType", select: "name icon" },
      { path: "operator", select: "name" },
    ],
  });
};

const getFavorites = async (userId) => {
  return FavoriteRoute.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "route",
      populate: [
        { path: "vehicleType", select: "name icon" },
        { path: "operator", select: "name" },
      ],
    });
};

const removeFavorite = async (userId, routeId) => {
  return FavoriteRoute.findOneAndDelete({ user: userId, route: routeId });
};

module.exports = {
  getRecentSearches,
  clearSearchHistory,
  addFavorite,
  getFavorites,
  removeFavorite,
};
