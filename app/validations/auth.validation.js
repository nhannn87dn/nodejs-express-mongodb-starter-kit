const Joi = require("joi");
const {passwordStrong} = require('./custom.validation');


const authLogin = {
   body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .required()
      .custom(passwordStrong),
   }),

};

module.exports = {
  authLogin,
}