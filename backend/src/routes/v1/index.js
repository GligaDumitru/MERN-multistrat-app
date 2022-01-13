const router = require("express").Router();
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const projectRoute = require("./project.route");
const timesheetRoute = require("./timesheet.route");
const requestRoute = require("./request.route");
const docsRoute = require("./docs.route");
const config = require("../../config/getEnv");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/projects",
    route: projectRoute,
  },
  {
    path: "/timesheets",
    route: timesheetRoute,
  },
  {
    path: "/requests",
    route: requestRoute,
  },
];

const developmentRoutes = [
  {
    path: "/docs",
    route: docsRoute,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

if (config.env === "development") {
  developmentRoutes.forEach(({ path, route }) => {
    router.use(path, route);
  });
}

module.exports = router;
