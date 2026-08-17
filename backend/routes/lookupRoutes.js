const express = require("express");

const VehicleType = require("../models/VehicleType");
const Operator = require("../models/Operator");
const { makeLookupController } = require("../controllers/lookupController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Builds a router for a lookup-table resource: public GET, admin-only
// POST/PUT/DELETE.
const buildRouter = (Model, entityName) => {
  const router = express.Router();
  const { create, getAll, update, remove } = makeLookupController(
    Model,
    entityName
  );

  router.get("/", getAll);
  router.post("/", protect, authorize("admin"), create);
  router.put("/:id", protect, authorize("admin"), update);
  router.delete("/:id", protect, authorize("admin"), remove);

  return router;
};

module.exports = {
  vehicleTypeRoutes: buildRouter(VehicleType, "Vehicle type"),
  operatorRoutes: buildRouter(Operator, "Operator"),
};
