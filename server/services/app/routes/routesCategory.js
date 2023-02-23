const express = require("express");
const Controller = require("../controllers/controller");
const router = express();

router.get("/", Controller.getAllCategories);
router.post("/", Controller.postCategory);
router.delete("/:id", Controller.deleteCategory);

module.exports = router;
