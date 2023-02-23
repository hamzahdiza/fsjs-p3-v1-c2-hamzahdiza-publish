const express = require("express");
const router = express.Router();

const { getAllUsers, getUserById, postAddUser, deleteUserById } = require("../controllers/userController");

router.get("/", getAllUsers);
router.post("/", postAddUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
