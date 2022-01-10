const Joi = require("joi");
const { customPasswordValidation, objectId } = require("./custom.validation");
const { roles } = require("../config/roles");

const createProject = {
  body: Joi.object().keys({
    managedBy: Joi.string().required().custom(objectId),
    imageLink: Joi.string(),
    description: Joi.string(),
    address: Joi.string(),
    name: Joi.string().required(),
    subtasks: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          createAt: Joi.string(),
          updatedAt: Joi.string(),
        })
      )
      .required(),
  }),
};

const getProject = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    managedBy: Joi.string().required().custom(objectId),
    imageLink: Joi.string(),
    description: Joi.string(),
    address: Joi.string(),
    name: Joi.string().required(),
    subtasks: Joi.array()
      .items(
        Joi.object({
          name: Joi.number().required(),
          createAt: Joi.string(),
          updatedAt: Joi.string(),
        })
      )
      .required(),
  }),
};

const deleteProject = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createProject,
  getProject,
  updateProject,
  deleteProject,
};
