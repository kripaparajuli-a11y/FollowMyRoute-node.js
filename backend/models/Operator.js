const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema(
  {
    name: {
      // "Sajha Yatayat", "Mahanagar Yatayat", private syndicate name, etc.
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    contact: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["Government", "Private", "Cooperative"],
      default: "Private",
    },
  },
  {
    timestamps: true,
  }
);

const Operator = mongoose.model("Operator", operatorSchema);

module.exports = Operator;
