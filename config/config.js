/* load environment variables from .env file */
const dotenv = require('dotenv');
const Joi = require('joi');
const path = require('path');

dotenv.config({
    path: path.join(__dirname, "../.env")
});

/* validate env  */
const envVarSchema = Joi.object().keys({
    NODE_ENV: Joi.string().valid("development", "production","test").required().default("development"),
    PORT: Joi.number().default(3000),
    MONGO_URI: Joi.string().required().description("MongoDB connect URI"),
    MONGO_COLLECTION: Joi.string().required().description("MongoDB Collection Name"),
    JWT_SECURE_KEY: Joi.string().required().description('JWT Secret Key'),
}).unknown();

const { value: envVars, error} = envVarSchema
.prefs({
  errors:{label: "key"}
}).validate(process.env);

if(error){
    throw new Error(`Config validation error: ${error.message} `);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {url: envVars.MONGO_URI, name: envVars.MONGO_COLLECTION},
    jwt: {secure_key: envVars.JWT_SECURE_KEY},
}
