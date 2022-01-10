const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { roles } = require("../config/roles");
const toJSON = require("./plugins/toJSON.plugin");

const subtaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    imageLink: {
      type: String,
      default: "https://via.placeholder.com/400",
    },
    description: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    managedBy: {
      type: String,
      required: true,
    },
    subtasks: {
      type: [subtaskSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.plugin(toJSON);
subtaskSchema.plugin(toJSON);

/**
 *
 * @param {string} name // Project Name
 * @param {ObjectId} excludeUserId // If you want to exclude an Id
 * @returns {Promise<boolean>}
 */
projectSchema.statics.isNameTaken = async function (name, excludeUserId) {
  const project = await this.findOne({
    name,
    _id: { $ne: excludeUserId }, // not equal to that id
  });

  // check is name project already exist in DB
  return !!project;
};

/**
 * @typedef Project
 */
const Project = mongoose.model("project", projectSchema);

module.exports = Project;
