const httpStatus = require("http-status");
const { userService, tokenService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req, res) => {
  // create user
  const user = await userService.createUser(req.body);
  // generate tokens
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

module.exports = {
  register,
};
