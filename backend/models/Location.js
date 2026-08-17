const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    // Alternate spellings / common misspellings so search is forgiving
    // e.g. "Koteshwor" -> ["Kotesor", "Koteswor", "Koteshwor Chowk"]
    aliases: {
      type: [String],
      default: [],
    },

    landmark: {
      type: String,
      trim: true,
      default: "",
    },

    zone: {
      type: String,
      enum: ["Kathmandu", "Lalitpur", "Bhaktapur", "Other"],
      default: "Kathmandu",
    },

    lat: {
      type: Number,
    },

    lng: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

locationSchema.index({ name: "text", aliases: "text", landmark: "text" });

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
