const userService = require("../services/userService");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    // A user can only view their own profile, unless they're an admin.
    const isSelf = req.user.id === req.params.id;
    const isAdmin = req.user.role === "admin";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own profile",
      });
    }

    const user = await userService.getUserById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    // A user can only update their own profile, unless they're an admin.
    // (Without this check, any logged-in user could edit anyone's
    // account just by knowing their user ID.)
    const isSelf = req.user.id === req.params.id;
    const isAdmin = req.user.role === "admin";

    if (!isSelf && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile",
      });
    }

    // Only admins may change roles
    if (!isAdmin) {
      delete req.body.role;
    }

    if (req.body.email !== undefined) {
      const email = String(req.body.email).trim().toLowerCase();

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address",
        });
      }

      req.body.email = email;
    }

    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.code === 11000 ? "That email address is already in use" : error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid user ID",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
