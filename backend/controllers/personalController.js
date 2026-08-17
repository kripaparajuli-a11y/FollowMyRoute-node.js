const personalService = require("../services/personalService");

const getRecentSearches = async (req, res, next) => {
  try {
    const searches = await personalService.getRecentSearches(req.user.id);
    res.status(200).json({ success: true, count: searches.length, data: searches });
  } catch (error) {
    next(error);
  }
};

const clearSearchHistory = async (req, res, next) => {
  try {
    await personalService.clearSearchHistory(req.user.id);
    res.status(200).json({ success: true, message: "Search history cleared" });
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    const favorites = await personalService.getFavorites(req.user.id);
    res.status(200).json({ success: true, count: favorites.length, data: favorites });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { routeId, note } = req.body;

    if (!routeId) {
      return res.status(400).json({ success: false, message: "routeId is required" });
    }

    const favorite = await personalService.addFavorite(req.user.id, routeId, note);
    res.status(201).json({ success: true, data: favorite });
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const favorite = await personalService.removeFavorite(req.user.id, req.params.routeId);

    if (!favorite) {
      return res.status(404).json({ success: false, message: "Favorite not found" });
    }

    res.status(200).json({ success: true, message: "Removed from favorites" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecentSearches,
  clearSearchHistory,
  getFavorites,
  addFavorite,
  removeFavorite,
};
