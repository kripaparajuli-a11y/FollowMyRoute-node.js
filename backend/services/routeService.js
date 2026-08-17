const Route = require("../models/Route");

const populateOpts = [
  { path: "vehicleType", select: "name icon" },
  { path: "operator", select: "name type" },
];

const createRoute = async (data) => {
  const route = await Route.create(data);
  return route.populate(populateOpts);
};

const getAllRoutes = async ({ includeInactive = false } = {}) => {
  // A public visitor sees only active routes added through the Admin panel.
  // Seed/demo records do not have `createdBy` and are deliberately excluded.
  const query = includeInactive
    ? {}
    : { isActive: true, createdBy: { $exists: true, $ne: null } };

  return await Route.find(query)
    .sort({ createdAt: -1 })
    .populate(populateOpts);
};

const getRouteById = async (id) => {
  return await Route.findById(id).populate(populateOpts);
};

const updateRoute = async (id, data) => {
  return await Route.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  ).populate(populateOpts);
};

const deleteRoute = async (id) => {
  return await Route.findByIdAndDelete(id);
};

const searchRoutes = async (search) => {
  return await Route.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { routeNumber: { $regex: search, $options: "i" } },
      { "stops.name": { $regex: search, $options: "i" } },
    ],
  }).populate(populateOpts);
};

module.exports = {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  searchRoutes,
};
