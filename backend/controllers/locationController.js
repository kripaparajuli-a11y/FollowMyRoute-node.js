const locationService = require("../services/locationService");

const createLocation = async (req, res, next) => {
  try {
    const location = await locationService.createLocation(req.body);
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

const getAllLocations = async (req, res, next) => {
  try {
    const { search } = req.query;

    const locations = search
      ? await locationService.searchLocations(search)
      : await locationService.getAllLocations();

    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    next(error);
  }
};

const updateLocation = async (req, res, next) => {
  try {
    const location = await locationService.updateLocation(req.params.id, req.body);

    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }

    res.status(200).json({ success: true, data: location });
  } catch (error) {
    next(error);
  }
};

const deleteLocation = async (req, res, next) => {
  try {
    const location = await locationService.deleteLocation(req.params.id);

    if (!location) {
      return res.status(404).json({ success: false, message: "Location not found" });
    }

    res.status(200).json({ success: true, message: "Location deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
};
