
const httpErrors = require('http-errors');

const notFoundHandler = (req, res, next) => {
  next(httpErrors(404, 'Route not found'));
};

module.exports = notFoundHandler;
