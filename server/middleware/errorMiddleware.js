const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    const errors = {};

    for (let field in err.errors) {
      errors[field] = err.errors[field].message;
    }

    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: "Validation failed",
      errors: {
        email: "This email address is already registered",
      },
    });
  }

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message || "An unexpected server error occurred",
  });
};


module.exports = errorHandler;