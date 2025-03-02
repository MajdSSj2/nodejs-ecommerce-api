const devEnvError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const ProdEnvError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,

    message: err.message,
  });
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") devEnvError(err, res);
  else ProdEnvError(err, res);
};

module.exports = globalErrorHandler;
