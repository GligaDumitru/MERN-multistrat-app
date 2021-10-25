const router = require("express").Router();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },

  // TODO: create route for /docs on dev only
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
