export function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
export function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(err.status || 500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
}
export function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
res.json({
  message: err.message,
  error: err
});
}

