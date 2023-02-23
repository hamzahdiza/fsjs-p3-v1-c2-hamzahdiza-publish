const express = require("express");
const PubController = require("../controllers/pubController");
const router = express();

router.get("/products", PubController.getAllProducts);
router.get("/products/:slugProduct", PubController.getProductbySlug);

module.exports = router;
