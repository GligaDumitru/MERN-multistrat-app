const router = require("express").Router();
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const requestValidation = require("../../validations/request.validation");

const requestController = require("../../controllers/request.controller");
const { ROLES_DEFINITION } = require("../../config/roles");

router
  .route("/")
  .get(auth(ROLES_DEFINITION.GET_PROJECTS), requestController.getRequests)
  .post(
    auth(ROLES_DEFINITION.CREATE_PROJECT),
    validate(requestValidation.createRequest),
    requestController.createRequest
  );

router
  .route("/:id")
  .get(
    auth(ROLES_DEFINITION.GET_PROJECTS),
    validate(requestValidation.getRequest),
    requestController.getRequestById
  )
  .patch(
    auth(ROLES_DEFINITION.UPDATE_PROJECT),
    validate(requestValidation.updateRequest),
    requestController.updateRequest
  )
  .delete(
    auth(ROLES_DEFINITION.DELETE_PROJECT),
    validate(requestValidation.deleteRequest),
    requestController.deleteRequest
  );

module.exports = router;
