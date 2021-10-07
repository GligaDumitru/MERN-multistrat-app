const mongoose = require("mongoose");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { env } = require("../config/getEnv");
const logger = require("../config/logger");

const convertToErrorMiddleware = (err, req, res, next) => {
  let error = err;
  // const isInstanceOfApiError = !(error instanceof ApiError);
  const isInstanceOfMongooseError = error instanceof mongoose.Error;

  // convert to ApiError with statusCode and message
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || isInstanceOfMongooseError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // in case there is not a statusCode or a messge
  if (!statusCode) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  // use this for morgan to send message
  res.locals.errorMessage = message;

  const response = {
    code: statusCode,
    message,
    ...(env === "development" && { stack: err.stack }),
  };

  if(env === "development"){
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  convertToErrorMiddleware,
  errorHandler,
};
