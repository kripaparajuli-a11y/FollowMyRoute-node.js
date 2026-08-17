const mongoose = require("mongoose");

const vehicleTypeSchema = new mongoose.Schema(
  {
    name: {
      // "Bus", "Micro Bus", "Sajha Bus", "Safa Tempo", "Tempo"
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    icon: {
      // frontend icon key, e.g. "bus" | "microbus" | "tempo"
      type: String,
      default: "bus",
    },
  },
  {
    timestamps: true,
  }
);

const VehicleType = mongoose.model("VehicleType", vehicleTypeSchema);

module.exports = VehicleType;
