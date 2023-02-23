const express = require("express");
const router = express();

const routesUser = require("./routesUser");
const routesProduct = require("./routesProduct");
const routesCategory = require("./routesCategory");
const routesPub = require("./routesPub");

router.use("/users", routesUser);
router.use("/products", routesProduct);
router.use("/pub", routesPub);
router.use("/categories", routesCategory);

module.exports = router;
