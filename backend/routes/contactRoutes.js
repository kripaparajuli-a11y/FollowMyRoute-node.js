const express = require("express");
const { createMessage, getMessages, deleteMessage } = require("../controllers/contactController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createMessage);
router.get("/", protect, authorize("admin"), getMessages);
router.delete("/:id", protect, authorize("admin"), deleteMessage);

module.exports = router;
