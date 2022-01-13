const mongoose = require("mongoose");
const toJSON = require("./plugins/toJSON.plugin");

const taskSchema = mongoose.Schema({
  projectId: {
    type: String,
    required: true,
  },
  subtaskId: {
    type: String,
    required: true,
  },
  days: {
    type: [String],
    required: true,
  },
});

const timesheetSchema = mongoose.Schema(
  {
    startDate: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    tasks: {
      type: [taskSchema],
      default: [],
    },
    managedBy: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

timesheetSchema.plugin(toJSON);
taskSchema.plugin(toJSON);
/**
 * @typedef Timesheet
 */
const Timesheet = mongoose.model("timesheet", timesheetSchema);

module.exports = Timesheet;
