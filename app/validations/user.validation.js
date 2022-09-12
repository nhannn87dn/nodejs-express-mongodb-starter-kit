const Joi = require("joi");
const {objectId, passwordStrong} = require('./custom.validation');

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};


const createUser = {
   body: Joi.object().keys({
    name: Joi.string().min(4).max(160).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .required()
      .custom(passwordStrong),
    role: Joi.string().required().valid("user", "admin","booking").default('user'),
    isEmailVerified: Joi.boolean().required().default('false')
   }),

};

const updateUser = {
  body: Joi.object().keys({
   name: Joi.string().min(3).max(20).required(),
   email: Joi.string().email().required(),
   role: Joi.string().required().valid("user", "admin","booking").default('user'),
   password: Joi.string()
    .min(8)
    .required()
    .custom(passwordStrong),
  isEmailVerified: Joi.boolean().required().default('false'),
  }),
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}