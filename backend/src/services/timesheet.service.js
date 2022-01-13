const httpStatus = require("http-status");
const { Timesheet } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create timesheet
 * @param {Object} timesheet
 * @returns {Promise<Timesheet>}
 */
const createTimesheet = async (timesheet) => {
  return Timesheet.create(timesheet);
};

/**
 * Gel All Timesheets
 * @returns {Promise<Timesheet>}
 */
const getTimesheets = async () => {
  const timesheets = await Timesheet.find({});
  return timesheets;
};

/**
 * Get Timesheet by ID
 * @param {ObjectId} id
 * @returns {Promise<Timesheet>}
 */
const getTimesheetById = async (id) => {
  return Timesheet.findById(id);
};

/**
 * Update Timesheet by id
 * @param {ObjectId} timesheetId
 * @param {Object} updatedBody
 * @returns {Promise<Timesheet>}
 */
const updateTimesheetById = async (timesheetId, updatedBody) => {
  const timesheet = await getTimesheetById(timesheetId);
  if (!timesheet) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]);
  }
  Object.assign(timesheet, updatedBody);
  await timesheet.save();
  return timesheet;
};

/**
 * Delete Timesheet by id
 * @param {ObjectId} id
 * @returns {Promise<Timesheet>}
 */
const deleteTimesheetById = async (timesheetId) => {
  const timesheet = await getTimesheetById(timesheetId);
  if (!timesheet) {
    throw new ApiError(httpStatus.NOT_FOUND, "Timesheet not found");
  }
  await timesheet.remove();
  return timesheet;
};

module.exports = {
  createTimesheet,
  getTimesheets,
  getTimesheetById,
  updateTimesheetById,
  deleteTimesheetById,
};
