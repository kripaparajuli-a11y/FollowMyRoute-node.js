const express = require("express");

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();


// Admin: get all users
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllUsers
);


// Logged-in user/admin can get a user
router.get(
  "/:id",
  protect,
  getUserById
);


// Logged-in user can update
router.put(
  "/:id",
  protect,
  updateUser
);


// Admin can delete
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteUser
);


module.exports = router;