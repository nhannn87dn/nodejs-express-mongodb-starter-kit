const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const AppError = require('../utils/AppError');

//TODO: error request handler AppError

module.exports = function (req, res, next){
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(" ")[1];
    if(!token) throw new AppError('Unauthorized',401); 

    try {
        const payload = jwt.verify(token,config.jwt.secure_key);
        req.user = payload;
        next();
    } catch (error) {
        throw new AppError(error,500);
    }
    
};