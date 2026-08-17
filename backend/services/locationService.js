const Location = require("../models/Location");

const createLocation = async (data) => Location.create(data);

const getAllLocations = async () => Location.find().sort({ name: 1 });

const searchLocations = async (query) => {
  const regex = new RegExp(query, "i");

  return Location.find({
    $or: [{ name: regex }, { aliases: regex }, { landmark: regex }],
  })
    .limit(10)
    .sort({ name: 1 });
};

const getLocationById = async (id) => Location.findById(id);

const updateLocation = async (id, data) =>
  Location.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteLocation = async (id) => Location.findByIdAndDelete(id);

module.exports = {
  createLocation,
  getAllLocations,
  searchLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
