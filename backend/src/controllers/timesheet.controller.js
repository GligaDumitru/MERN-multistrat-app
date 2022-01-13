const httpStatus = require("http-status");
const _ = require("lodash");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { timesheetService } = require("../services");

const createTimesheet = catchAsync(async (req, res) => {
  const timesheet = await timesheetService.createTimesheet(req.body);
  res.status(httpStatus.CREATED).send({ timesheet });
});

const getTimesheets = catchAsync(async (req, res) => {
  const timesheets = await timesheetService.getTimesheets();
  res.status(httpStatus.OK).send({
    timesheets,
  });
});

const getTimesheetById = catchAsync(async (req, res) => {
  const timesheet = await timesheetService.getTimesheetById(req.params.id);
  if (!timesheet) {
    throw new ApiError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND], [
      "Timesheet not found",
    ]);
  }
  res.status(httpStatus.OK).send({ timesheet });
});

const updateTimesheet = catchAsync(async (req, res) => {
  const timesheet = await timesheetService.updateTimesheetById(
    req.params.id,
    req.body
  );
  res.status(httpStatus.OK).send({ timesheet });
});

const deleteTimesheet = catchAsync(async (req, res) => {
  await timesheetService.deleteTimesheetById(req.params.id);
  res.status(httpStatus.ACCEPTED).send({});
});

module.exports = {
  createTimesheet,
  getTimesheets,
  getTimesheetById,
  updateTimesheet,
  deleteTimesheet,
};
