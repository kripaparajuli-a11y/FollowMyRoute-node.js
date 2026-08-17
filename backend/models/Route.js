const mongoose = require("mongoose");

// A single stop within a route, in travel order.
// `location` links to the Location collection (used for admin management
// and autocomplete); `name` is denormalized onto the route itself so trip
// search doesn't need to populate/join on every request.
const stopSchema = new mongoose.Schema(
  {
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      required: true,
    },

    // Fare from the very first stop of the route up to this stop.
    // Lets us compute the fare for any partial segment of the route
    // (start - stop1) by subtracting two of these values.
    fareFromStart: {
      type: Number,
      required: true,
      min: 0,
    },

    // Approximate minutes from the very first stop of the route.
    minutesFromStart: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

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

    vehicleType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleType",
      required: true,
    },

    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Operator",
    },

    // Set when an administrator creates the route. Seed/demo routes do not
    // have this value, so the public route finder can exclude them.
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Ordered list of stops, index 0 = start, last index = end.
    stops: {
      type: [stopSchema],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length >= 2,
        message: "A route needs at least 2 stops",
      },
    },

    standardFare: {
      // full end-to-end fare for a standard passenger
      type: Number,
      required: true,
      min: 0,
    },

    studentFare: {
      // full end-to-end fare with student discount
      type: Number,
      required: true,
      min: 0,
    },

    estimatedTime: {
      // human-readable end-to-end time, e.g. "45 min"
      type: String,
      required: true,
    },

    operatingHours: {
      type: String,
      required: true,
      default: "6:00 AM - 8:00 PM",
    },

    frequencyMinutes: {
      // how often a vehicle on this route typically comes
      type: Number,
      default: 15,
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

// Virtual convenience fields
routeSchema.virtual("startPoint").get(function () {
  return this.stops?.[0]?.name;
});

routeSchema.virtual("destination").get(function () {
  return this.stops?.[this.stops.length - 1]?.name;
});

routeSchema.set("toJSON", { virtuals: true });
routeSchema.set("toObject", { virtuals: true });

routeSchema.index({ "stops.name": 1 });
routeSchema.index({ routeNumber: "text", name: "text" });

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
