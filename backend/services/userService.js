const User = require("../models/User");

const getAllUsers = async () => {
  return await User.find().select("-password");
};

const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

const updateUser = async (id, data) => {
  delete data.password;

  return await User.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};