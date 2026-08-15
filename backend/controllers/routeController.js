const routeService = require("../services/routeService");

const createRoute = async (req, res) => {
  try {
    const route = await routeService.createRoute(req.body);

    res.status(201).json({
      success: true,
      message: "Route created successfully",
      data: route,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllRoutes = async (req, res) => {
  try {
    const routes = await routeService.getAllRoutes();

    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRouteById = async (req, res) => {
  try {
    const route = await routeService.getRouteById(
      req.params.id
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    res.status(200).json({
      success: true,
      data: route,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid route ID",
    });
  }
};

const updateRoute = async (req, res) => {
  try {
    const route = await routeService.updateRoute(
      req.params.id,
      req.body
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Route updated successfully",
      data: route,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteRoute = async (req, res) => {
  try {
    const route = await routeService.deleteRoute(
      req.params.id
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Route deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid route ID",
    });
  }
};

const searchRoutes = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const routes = await routeService.searchRoutes(search);

    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  searchRoutes,
};