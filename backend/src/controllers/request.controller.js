const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { requestService } = require("../services");

const createRequest = catchAsync(async (req, res) => {
  const request = await requestService.createRequest(req.body);
  res.status(httpStatus.CREATED).send({ request });
});

const getRequests = catchAsync(async (req, res) => {
  const requests = await requestService.getRequests();
  res.status(httpStatus.OK).send({
    requests,
  });
});

const getRequestById = catchAsync(async (req, res) => {
  const request = await requestService.getRequestById(req.params.id);
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "Request not found",
    ]);
  }
  res.status(httpStatus.OK).send({ request });
});

const updateRequest = catchAsync(async (req, res) => {
  const request = await requestService.updateRequestById(
    req.params.id,
    req.body
  );
  res.status(httpStatus.OK).send({ request });
});

const deleteRequest = catchAsync(async (req, res) => {
  await requestService.deleteRequestById(req.params.id);
  res.status(httpStatus.ACCEPTED).send({});
});

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
