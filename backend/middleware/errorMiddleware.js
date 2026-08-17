// Centralized error handler. Any controller that calls next(error)
// (instead of writing its own try/catch response) ends up here, so
// error responses stay consistent across the whole API.
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack || err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong on the server";

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0];
    message = `${field} already exists`;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;
