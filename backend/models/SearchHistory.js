const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    from: {
      type: String,
      required: true,
      trim: true,
    },

    to: {
      type: String,
      required: true,
      trim: true,
    },

    resultType: {
      // what kind of result the search returned, for quick display
      type: String,
      enum: ["direct", "transfer", "none"],
      default: "none",
    },

    resultCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Most recent searches first, per user
searchHistorySchema.index({ user: 1, createdAt: -1 });

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);

module.exports = SearchHistory;
