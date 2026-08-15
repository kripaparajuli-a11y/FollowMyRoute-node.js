const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    routeNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    startPoint: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    stops: {
      type: [String],
      required: true,
    },

    fare: {
      type: Number,
      required: true,
      min: 0,
    },

    estimatedTime: {
      type: String,
      required: true,
    },

    operatingHours: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;