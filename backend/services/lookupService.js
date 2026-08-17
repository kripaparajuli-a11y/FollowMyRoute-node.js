// Shared CRUD logic for simple "lookup table" models like VehicleType
// and Operator, which don't need any special behaviour beyond basic CRUD.
const makeLookupService = (Model) => ({
  create: (data) => Model.create(data),
  getAll: () => Model.find().sort({ name: 1 }),
  getById: (id) => Model.findById(id),
  update: (id, data) =>
    Model.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  delete: (id) => Model.findByIdAndDelete(id),
});

module.exports = { makeLookupService };
