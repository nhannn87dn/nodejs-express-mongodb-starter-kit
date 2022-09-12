const Joi = require("joi");
const _ = require("lodash");

const validate = (schema) => (req, res, next) => {
    const validateSchema = _.pick(schema,["params","body","query"]);
    const object = _.pick(req,Object.keys(validateSchema));
    const {value, error} = Joi.compile(validateSchema).prefs({
        errors: {
            label: "key"
        },

        abortEarly: false
    })
    .validate(object);
    if(error){
        const errorMessage = error.details.map((detail)=> detail.message).join(", ");
        return res.status(400).json({
            status: 400,
            message: errorMessage
        })
    }
    Object.assign(req,value);
    return next();
};

module.exports = validate;