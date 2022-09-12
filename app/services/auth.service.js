const {User} = require('../models');
const AppError = require('../utils/AppError');
//const _ = require('lodash');

const authLogin = async (userBody) => {

    let user = await User.findOne({
        email: userBody.email
    });
    if(!user){
        throw new AppError('Invalid email or password', 400);
    } 

    const invalidPasword = await user.invalidPassword(
        userBody.password,
        user.password
    );

    if(!invalidPasword) throw new AppError('Invalid email or password', 400);
    
    const token = user.generateAuthToken();
    return token;
}

module.exports = {
    authLogin,
};
