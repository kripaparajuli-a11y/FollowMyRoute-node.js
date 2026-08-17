const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

// Generates a one-time reset token, stores only its hash on the user
// (so a leaked DB never exposes usable tokens), and returns the raw
// token so it can be sent to the user (e.g. via email, or a dev-mode
// link when no email service is configured).
const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });

  // Always behave the same whether or not the user exists, so callers
  // can't use this endpoint to check which emails are registered.
  if (!user) {
    return null;
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 30; // 30 minutes
  await user.save();

  return rawToken;
};

const resetPassword = async (rawToken, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  }).select("+resetPasswordToken +resetPasswordExpires");

  if (!user) {
    throw new Error("Reset link is invalid or has expired");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return true;
};

module.exports = {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
};