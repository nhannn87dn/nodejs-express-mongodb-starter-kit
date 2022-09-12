const winston = require('winston');
const config = require("./config");
const path = require('path');

const expressWinston = require('express-winston');
const packageName = require('../package.json');

const logFormatter = winston.format.printf((info) => {
  const { timestamp, level, stack, message } = info;
  const errorMessage = stack || message;

  const symbols = Object.getOwnPropertySymbols(info);
  if (info[symbols[0]] !== 'error') {
    return `${timestamp} ${level}: ${message}`;
  }

  return `${timestamp} ${level}: ${errorMessage}`;
});

const logger = winston.createLogger({
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: `${packageName.name.toLocaleLowerCase()}-service` },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormatter)
    })
  ]
});

if (config.env === 'production') {
  logger.add(new winston.transports.File({ filename: path.join(__dirname,'../storage/logs/error.log'), level: 'error' }));
  logger.add(new winston.transports.File({ filename: path.join(__dirname,'../storage/logs/combined.log'), level: 'debug' }));
}

module.exports = logger;

module.exports.requestLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(winston.format.json(), winston.format.prettyPrint()),
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  ignoreRoute(req, res) {
    return false;
  }
});