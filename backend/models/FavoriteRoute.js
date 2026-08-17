const mongoose = require("mongoose");

const favoriteRouteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },

    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// A user can only favorite a given route once
favoriteRouteSchema.index({ user: 1, route: 1 }, { unique: true });

const FavoriteRoute = mongoose.model("FavoriteRoute", favoriteRouteSchema);

module.exports = FavoriteRoute;
