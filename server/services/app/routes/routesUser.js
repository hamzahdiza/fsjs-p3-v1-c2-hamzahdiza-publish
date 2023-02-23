const express = require("express");
const Controller = require("../controllers/controller");
const router = express();

// router.get("/", Controller.getAllUser);

router.post("/register", Controller.registerAdmin);
router.post("/login", Controller.login);

module.exports = router;
