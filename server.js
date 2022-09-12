const app = require('./app/app'); //app init
const stoppable = require('stoppable');
const gracefulShutdown = require('./app/utils/gracefulShutdown');
const config = require("./config/config");
const logger = require('./config/logger');
const { errorHandler } = require("./app/middlewares");
const mongoose = require('mongoose');
const PORT = config.port || 3001;
let server;

/// Start the server

mongoose
.connect(config.mongoose.url)
.then(()=> {
    logger.info('Connected to MongoDB');
    server = app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}`);
    });
})
.catch((err)=> logger.error("faild to connect to DB", err));

/// Catch All Uncaught Exceptions
process.on('uncaughtException', error => {
    errorHandler.logError(error)
   
    if (!errorHandler.isOperationalError(error)) {
        process.exit(1)
    }
});


process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');

    process.exit(1);

});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    process.exit(1);
});

// quit on ctrl+c when running in terminal
process.on('SIGINT', async () => {
    logger.info('Got SIGINT (Press ctrl+c in Terminal). Graceful shutdown', new Date().toISOString());
    await gracefulShutdown(stoppable(server));
});
  
// quit properly on docker stop
process.on('SIGTERM', async () => {
    logger.info('Got SIGTERM (Terminal Stop). Graceful shutdown', new Date().toISOString());
    await gracefulShutdown(stoppable(server));
});
  