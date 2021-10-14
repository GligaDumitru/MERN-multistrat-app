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
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10),
  })
  .unknown();

const validateSchema = getEnvSchema.validate(process.env);

const { value: getEnvVars, error } = validateSchema;

if (error) {
  throw new Error(`ERROR: Validation .env failed with error: ${error.message}`);
}

module.exports = {
  env: getEnvVars.NODE_ENV,
  port: getEnvVars.PORT,
  mongoose: {
    url:
      getEnvVars.MONGODB_URL + (getEnvVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useNewUrlParser: true,
    },
  },
  jwt: {
    secret: getEnvVars.JWT_SECRET,
    accessExpirationMinutes: getEnvVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpiratonDays: getEnvVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      getEnvVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: getEnvVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
};
