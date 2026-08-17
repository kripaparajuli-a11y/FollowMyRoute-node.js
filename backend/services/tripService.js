const Route = require("../models/Route");

// Buffer added to account for waiting time when transferring vehicles
const TRANSFER_BUFFER_MINUTES = 10;

const studentFareFor = (regularFare) => {
  if (regularFare <= 0) return 0;
  if (regularFare <= 24) return 13;
  if (regularFare <= 33) return 18;
  if (regularFare <= 39) return 21;
  if (regularFare <= 44) return 24;
  return 28;
};

const normalize = (str = "") => str.trim().toLowerCase();

/**
 * Find the index of the first stop on a route whose name matches `query`
 * (case-insensitive, substring match so "Kotesh" matches "Koteshwor").
 */
const findStopIndex = (route, query) => {
  const q = normalize(query);
  return route.stops.findIndex((stop) => normalize(stop.name).includes(q));
};

/**
 * Fare/time for a segment of a route between two stop indices, using
 * whichever fare tier ("standardFare"/"studentFare") the caller wants.
 */
const buildSegment = (route, fromIdx, toIdx, fareType = "standard") => {
  const fromStop = route.stops[fromIdx];
  const toStop = route.stops[toIdx];

  const totalFareBasis = route.stops[route.stops.length - 1].fareFromStart || 1;

  // Pro-rate the route's end-to-end fare by distance along the route.
  // (Real-world fares aren't perfectly linear, but this gives a fair
  // estimate when only full-route fares are on record.)
  const fareDelta = toStop.fareFromStart - fromStop.fareFromStart;
  const regularFare = totalFareBasis
    ? Math.round((fareDelta / totalFareBasis) * route.standardFare)
    : route.standardFare;
  const fare = fareType === "student" ? studentFareFor(regularFare) : regularFare;

  const minutes = toStop.minutesFromStart - fromStop.minutesFromStart;

  return {
    routeId: route._id,
    routeNumber: route.routeNumber,
    routeName: route.name,
    vehicleType: route.vehicleType,
    operator: route.operator,
    board: fromStop.name,
    alight: toStop.name,
    stopsBetween: toIdx - fromIdx,
    fare: Math.max(fare, 0),
    minutes: Math.max(minutes, 1),
  };
};

/**
 * Pure planning function: takes an already-fetched array of plain route
 * objects (each with an ordered `stops` array) and returns direct or
 * one-transfer trip options. Kept separate from the DB fetch so it can
 * be unit-tested without a database.
 */
const planTripFromRoutes = (routes, from, to, fareType = "standard") => {
  // ---- 1. Direct routes ----
  const direct = [];

  for (const route of routes) {
    const fromIdx = findStopIndex(route, from);
    const toIdx = findStopIndex(route, to);

    if (fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx) {
      direct.push({
        type: "direct",
        legs: [buildSegment(route, fromIdx, toIdx, fareType)],
      });
    }
  }

  if (direct.length > 0) {
    direct.sort((a, b) => a.legs[0].minutes - b.legs[0].minutes);
    return { type: "direct", options: direct.slice(0, 5) };
  }

  // ---- 2. One-transfer routes ----
  const originRoutes = routes
    .map((route) => ({ route, idx: findStopIndex(route, from) }))
    .filter((r) => r.idx !== -1);

  const destinationRoutes = routes
    .map((route) => ({ route, idx: findStopIndex(route, to) }))
    .filter((r) => r.idx !== -1);

  const transfers = [];

  for (const originEntry of originRoutes) {
    for (const destEntry of destinationRoutes) {
      const routeA = originEntry.route;
      const routeB = destEntry.route;

      if (String(routeA._id) === String(routeB._id)) continue;

      // Look for a stop shared by both routes, in the right direction
      for (let i = originEntry.idx + 1; i < routeA.stops.length; i++) {
        const transferStopName = normalize(routeA.stops[i].name);

        const bIdx = routeB.stops.findIndex(
          (s) => normalize(s.name) === transferStopName
        );

        if (bIdx !== -1 && bIdx < destEntry.idx) {
          const leg1 = buildSegment(routeA, originEntry.idx, i, fareType);
          const leg2 = buildSegment(routeB, bIdx, destEntry.idx, fareType);

          transfers.push({
            type: "transfer",
            legs: [leg1, leg2],
            transferPoint: routeA.stops[i].name,
            totalFare: leg1.fare + leg2.fare,
            totalMinutes: leg1.minutes + leg2.minutes + TRANSFER_BUFFER_MINUTES,
          });

          // one good transfer point per route pair is enough
          break;
        }
      }
    }
  }

  if (transfers.length > 0) {
    transfers.sort((a, b) => a.totalMinutes - b.totalMinutes);

    // De-duplicate near-identical options (same route pair + transfer point)
    const seen = new Set();
    const deduped = transfers.filter((t) => {
      const key = `${t.legs[0].routeId}-${t.legs[1].routeId}-${t.transferPoint}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return { type: "transfer", options: deduped.slice(0, 5) };
  }

  return { type: "none", options: [] };
};

/**
 * Main entry point: given a "from" and "to" free-text query, fetches
 * active routes from the database and returns the best trip options.
 */
const planTrip = async (from, to, fareType = "standard") => {
  // Public trip search must use the same set of admin-published routes as
  // the Routes catalogue. Seed/demo data is never returned to users.
  const routes = await Route.find({
    isActive: true,
    createdBy: { $exists: true, $ne: null },
  })
    .populate("vehicleType", "name icon")
    .populate("operator", "name")
    .lean();

  return planTripFromRoutes(routes, from, to, fareType);
};

module.exports = {
  planTrip,
  planTripFromRoutes,
};
