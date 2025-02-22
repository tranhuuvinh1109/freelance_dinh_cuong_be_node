const RootRoute = require("./RootRoute");
const AuthRoute = require("./AuthRoute");
const PlanRoute = require("./PlanRoute");
const CategoryRoute = require("./CategoryRoute");
const ServiceRoute = require("./ServiceRoute");

function routes(app) {
  app.use("/", RootRoute);
  app.use("/auth", AuthRoute);
  app.use("/category", CategoryRoute);
  app.use("/service", ServiceRoute);
  app.use("/plan", PlanRoute);
}

module.exports = routes;
