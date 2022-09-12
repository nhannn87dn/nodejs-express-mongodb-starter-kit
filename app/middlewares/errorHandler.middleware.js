
/**
 * Doc: 
 * https://sematext.com/blog/node-js-error-handling/#toc-2-use-a-middleware-8
 * https://medium.com/@SigniorGratiano/express-error-handling-674bfdd86139
 */

const AppError = require('../utils/AppError');
const logger = require('../../config/logger');
const config = require('../../config/config');

const logError = (err) => {
    logger.error(err);
}

const  logErrorMiddleware = (err, req, res, next) => {
    logError(err);
    next(err);
}


const  notFound = (req, res, next) => {
    next(new AppError('API not Found',404));
}
//TODO: error request handler
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      error: err,
      message: err.message,
      stack: err.stack
    });
};
//TODO: error request handler  
const sendErrorProd = (err, res) => {
    logError(`ERROR :: StatusCode: ${err.statusCode}, Message: ${err.message}`);
    // Operational, trusted error: send message to client
    if (err.isOperational) {
     
      res.status(err.statusCode).json({
        status: err.status,
        code: err.statusCode,
        message: err.message
      });
  
      // Programming or other unknown error
    } else {
      // 1) Log error
  
      // 2) Send generic message
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      });
    }
};

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use anothe value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const  returnError = (err, req, res, next) =>{

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (config.env === 'development') {
        sendErrorDev(err, res);
    } else if (config.env === 'production') {
        let error = { ...err, message: err.message };
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        
        sendErrorProd(error, res);
    }
}

const  isOperationalError = (error) =>{
    if (error instanceof AppError) {
        return error.isOperational;
    }
    return false;
}
   
module.exports = {
    logError,
    logErrorMiddleware,
    notFound,
    returnError,
    isOperationalError
}