const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

// create schema to validate
const getEnvSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development", "test"),
    PORT: Joi.number().default(5000),
    MONGODB_URL: Joi.string().required(),
  })
  .unknown();

const validateSchema = getEnvSchema
  .validate(process.env);

const { value: getEnvVars, error } = validateSchema;

if (error) {
  throw new Error(`ERROR: Validation .env failed with error: ${error.message}`);
}

module.exports = {
  env: getEnvVars.NODE_ENV,
  port: getEnvVars.PORT,
  mongoose: {
    url: getEnvVars.MONGODB_URL,
    options: {
      useNewUrlParser: true,
    },
  },
};
