const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService, tokenService, emailService } = require("../services");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const createEmployee = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email, verifyEmailToken);
  res.status(httpStatus.CREATED).send({ user, verifyEmailSent: true });
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers(req.body);
  res.status(httpStatus.OK).send({
    results: users,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "User not found",
    ]);
  }
  res.status(httpStatus.OK).send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  res.status(httpStatus.OK).send({ user });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.id);
  res.status(httpStatus.OK).send({});
});

module.exports = {
  createUser,
  createEmployee,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
