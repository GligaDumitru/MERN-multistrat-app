const router = require("express").Router();
const authRoute = require("./auth.route");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  // TODO: create route for users
  // TODO: create route for /docs on dev only
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;