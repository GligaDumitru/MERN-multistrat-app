const router = require("express").Router();
const authController = require("../../controllers/auth.controller");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

module.exports = router;
