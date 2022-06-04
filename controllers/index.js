const router = require("express").Router();

const apiRoutes = require("./api/");
const homeRoutes = require("./home-routes.js");
// merge dashboard router module into the rest of the app
const dashboardRoutes = require("./dashboard-routes.js");

router.use("/", homeRoutes);
// merge dashboard router module into the rest of the app
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;

// file will collect the packaged API routes
// and prefix them with the path /api
