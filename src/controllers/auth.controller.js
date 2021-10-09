const httpStatus = require("http-status");
const { userService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req, res) => {
  // create user
  const user = await userService.createUser(req.body);
  // generate tokens
  // TODO: generate tokens
  // TODO: add tokens to res
  res.status(httpStatus.CREATED).send({ user });
});

module.exports = {
  register,
};
