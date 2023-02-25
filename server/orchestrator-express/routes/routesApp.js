const express = require("express");
const appControlller = require("../controllers/appController");
const router = express.Router();

router.get("/", appControlller.orcGetAllProducts);
router.post("/", appControlller.orcPostProduct);
router.get("/:slugProduct", appControlller.orcGetProductBySlug);
router.put("/:slugProduct", appControlller.orcPutProduct);
router.delete("/:idProduct", appControlller.orcDeleteProduct);

module.exports = router;
