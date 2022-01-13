const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createTimesheet = {
  body: Joi.object().keys({
    managedBy: Joi.string().required().custom(objectId),
    startDate: Joi.string().required(),
    status: Joi.string(),
    userId: Joi.string().required().custom(objectId),
    tasks: Joi.array()
      .items(
        Joi.object({
          projectId: Joi.string().required().custom(objectId),
          subtaskId: Joi.string(),
          days: Joi.array().items(Joi.string()),
          id: Joi.string().custom(objectId),
        })
      )
      .required(),
  }),
};

const getTimesheet = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateTimesheet = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    managedBy: Joi.string().custom(objectId),
    startDate: Joi.string(),
    status: Joi.string(),
    userId: Joi.string().custom(objectId),
    tasks: Joi.array().items(
      Joi.object({
        projectId: Joi.string().custom(objectId),
        subtaskId: Joi.string(),
        days: Joi.array().items(Joi.string()),
        id: Joi.string().custom(objectId),
      })
    ),
  }),
};

const deleteTimesheet = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createTimesheet,
  getTimesheet,
  updateTimesheet,
  deleteTimesheet,
};
