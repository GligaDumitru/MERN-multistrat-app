const mongoose = require("mongoose");
const toJSON = require("./plugins/toJSON.plugin");

const requestSchema = mongoose.Schema(
  {
    startDate: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    days: {
      type: [Number],
      required: true,
    },
    requestType: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
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

requestSchema.plugin(toJSON);
/**
 * @typedef Request
 */
const Request = mongoose.model("request", requestSchema);

module.exports = Request;
