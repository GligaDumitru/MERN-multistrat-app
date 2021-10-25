const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { roleRights } = require("../config/roles");

const verifyAuthCb =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    let userRights = [];
    // check respone from jwt verification
    if (err || info || !user) {
      return reject(
        new ApiError(
          httpStatus.UNAUTHORIZED,
          "Please authenticate to access this route"
        )
      );
    }
    if (requiredRights.length) {
      // get user rights
      userRights = roleRights.get(user.role);

      // true || false
      const hasRequiredRights = requiredRights.every((right) =>
        userRights.includes(right)
      );

      // if do not have enough rights and it is not for yourself reject error
      if (!hasRequiredRights && req.params.id !== user.id) {
        let requiredRightsError = [...requiredRights]
          .filter((right) => !userRights.includes(right))
          .map((currentRight) => `The ${currentRight} right is required`);

        return reject(
          new ApiError(
            httpStatus.FORBIDDEN,
            "Do not have rights to execute this operation",
            requiredRightsError
          )
        );
      }

      resolve();
    }
  };

const auth = (requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyAuthCb(req, resolve, reject, requiredRights)
    )(req, res, next);
  })
    .then(() => next())
    .catch((error) => next(error));
};

module.exports = auth;
