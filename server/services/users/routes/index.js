const express = require("express");
const router = express();

const routesUser = require("./routesUser");

router.use("/users", routesUser);

module.exports = router;
