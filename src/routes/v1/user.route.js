const router = require("express").Router();
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");
const { ROLES_DEFINITION } = require("../../config/roles");

router
  .route("/")
  .get(
    auth([ROLES_DEFINITION.GET_USERS]),
    validate(userValidation.getUsers),
    userController.getUsers
  )
  .post(
    auth([ROLES_DEFINITION.CREATE_USER]),
    validate(userValidation.createUser),
    userController.createUser
  );

router
  .route("/role/:id")
  .patch(
    auth([ROLES_DEFINITION.UPDATE_USER_ROLE]),
    validate(userValidation.updateUserRole),
    userController.updateUser
  );

router
  .route("/:id")
  .get(
    auth([ROLES_DEFINITION.GET_USERS]),
    validate(userValidation.getUser),
    userController.getUserById
  )
  .patch(
    auth([ROLES_DEFINITION.UPDATE_USER]),
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    auth([ROLES_DEFINITION.DELETE_USER]),
    validate(userValidation.deleteUser),
    userController.deleteUser
  );

module.exports = router;
