const express = require("express");
const router = express();

const routesUser = require("./routesUser");
const routeApp = require("./routesApp");

router.use("/users", routesUser);
router.use("/products", routeApp);

module.exports = router;
