const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createRequest = {
  body: Joi.object().keys({
    managedBy: Joi.string().required().custom(objectId),
    startDate: Joi.string().required(),
    status: Joi.string(),
    userId: Joi.string().required().custom(objectId),
    requestType: Joi.string().required(),
    task: Joi.string().required(),
    days: Joi.array().items(Joi.number()).required(),
  }),
};

const updateRequest = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    managedBy: Joi.string().custom(objectId),
    startDate: Joi.string(),
    status: Joi.string(),
    userId: Joi.string().custom(objectId),
    requestType: Joi.string(),
    task: Joi.string(),
    days: Joi.array().items(Joi.number()),
  }),
};

const deleteRequest = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

const getRequest = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRequest,
  getRequest,
  updateRequest,
  deleteRequest,
};
