const ContactMessage = require("../models/ContactMessage");

const createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const savedMessage = await ContactMessage.create({ name, email, message });
    res.status(201).json({ success: true, message: "Message sent successfully", data: savedMessage });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: "Message not found" });
    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createMessage, getMessages, deleteMessage };
