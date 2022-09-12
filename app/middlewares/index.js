const errorHandler = require('./errorHandler.middleware');
const cpuPercentage = require("./cpuUsage.middleware");
const rateLimit = require("./rateLimitter.middleware");
const validate = require("./validate.middleware");
const auth = require("./auth.middleware");

module.exports = {
    errorHandler,
    cpuPercentage,
    rateLimit,
    validate,
    auth
  };