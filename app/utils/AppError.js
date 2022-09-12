class AppError extends Error {
    constructor(message, statusCode, isOperational = true, stack = ""){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = isOperational;
        this.message = message;
        if(stack){
            this.stack = stack;

        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
   
module.exports = AppError