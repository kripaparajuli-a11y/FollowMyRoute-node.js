const Route = require("../models/Route");

const createRoute = async (data) => {
  return await Route.create(data);
};

const getAllRoutes = async () => {
  return await Route.find().sort({ createdAt: -1 });
};

const getRouteById = async (id) => {
  return await Route.findById(id);
};

const updateRoute = async (id, data) => {
  return await Route.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteRoute = async (id) => {
  return await Route.findByIdAndDelete(id);
};

const searchRoutes = async (search) => {
  return await Route.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { routeNumber: { $regex: search, $options: "i" } },
      { startPoint: { $regex: search, $options: "i" } },
      { destination: { $regex: search, $options: "i" } },
      { stops: { $regex: search, $options: "i" } },
    ],
  });
};

module.exports = {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  searchRoutes,
};