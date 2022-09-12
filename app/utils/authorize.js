const AppError = require('./AppError');
const authorize = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (roles.length && !roles.includes(req.user.role)) {
            // user's role is not authorized
            throw new AppError('Forbidden',403);
        }

        // authentication and authorization successful
        next();
    }
}

module.exports = authorize;