const { makeLookupService } = require("../services/lookupService");

// Creates a full set of Express handlers (create/getAll/update/delete)
// for a simple lookup-table model, and a not-found message to use.
const makeLookupController = (Model, entityName) => {
  const service = makeLookupService(Model);

  const create = async (req, res, next) => {
    try {
      const item = await service.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  const getAll = async (req, res, next) => {
    try {
      const items = await service.getAll();
      res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const item = await service.update(req.params.id, req.body);

      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: `${entityName} not found` });
      }

      res.status(200).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const item = await service.delete(req.params.id);

      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: `${entityName} not found` });
      }

      res.status(200).json({ success: true, message: `${entityName} deleted` });
    } catch (error) {
      next(error);
    }
  };

  return { create, getAll, update, remove };
};

module.exports = { makeLookupController };
