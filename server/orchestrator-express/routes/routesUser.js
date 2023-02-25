const express = require("express");
const userControlller = require("../controllers/userController");
const router = express.Router();

router.get("/", userControlller.orcGetAllUsers);
router.post("/", userControlller.orcPostAddUser);
router.get("/:id", userControlller.orcGetUserById);
router.delete("/:id", userControlller.orcDeleteUserById);

module.exports = router;
