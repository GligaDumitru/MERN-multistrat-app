const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create user
 * @param {Object} user
 * @returns {Promise<User>}
 */
const createUser = async (user) => {
  if (await User.isEmailTaken(user.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return User.create(user);
};

module.exports = {
  createUser,
};
