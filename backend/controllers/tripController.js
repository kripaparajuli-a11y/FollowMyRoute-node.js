const tripService = require("../services/tripService");
const SearchHistory = require("../models/SearchHistory");

const searchTrip = async (req, res, next) => {
  try {
    const { from, to, fareType } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "Both 'from' and 'to' are required",
      });
    }

    const result = await tripService.planTrip(
      from,
      to,
      fareType === "student" ? "student" : "standard"
    );

    // Log search history for logged-in users (fire-and-forget, never
    // blocks the response if it fails)
    if (req.user?.id) {
      SearchHistory.create({
        user: req.user.id,
        from,
        to,
        resultType: result.type,
        resultCount: result.options.length,
      }).catch((err) =>
        console.error("Failed to log search history:", err.message)
      );
    }

    res.status(200).json({
      success: true,
      from,
      to,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchTrip,
};
