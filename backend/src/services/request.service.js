const httpStatus = require("http-status");
const { Request } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create request
 * @param {Object} request
 * @returns {Promise<Request>}
 */
const createRequest = async (request) => {
  return Request.create(request);
};

/**
 * Gel All Requests
 * @returns {Promise<Request>}
 */
const getRequests = async () => {
  const requests = await Request.find({});
  return requests;
};

/**
 * Get Request by ID
 * @param {ObjectId} id
 * @returns {Promise<Request>}
 */
const getRequestById = async (id) => {
  return Request.findById(id);
};

/**
 * Update Request by id
 * @param {ObjectId} requestId
 * @param {Object} updatedBody
 * @returns {Promise<Request>}
 */
const updateRequestById = async (requestId, updatedBody) => {
  const request = await getRequestById(requestId);
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
  }
  Object.assign(request, updatedBody);
  await request.save();
  return request;
};

/**
 * Delete Request by id
 * @param {ObjectId} id
 * @returns {Promise<Request>}
 */
const deleteRequestById = async (requestId) => {
  const request = await getRequestById(requestId);
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, "Request not found");
  }
  await request.remove();
  return request;
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestById,
  deleteRequestById,
};
