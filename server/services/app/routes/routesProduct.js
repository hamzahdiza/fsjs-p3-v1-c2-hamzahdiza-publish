const express = require("express");
const Controller = require("../controllers/controller");
const { authentication } = require("../middleware/auth");
const router = express();

router.use(authentication);
router.get("/", Controller.getAllProducts);
router.post("/", Controller.postAddProducts);
router.get("/:slugProduct", Controller.getProductbySlug);
router.delete("/:idProduct", Controller.deleteProductbySlug);
router.put("/:slugProduct", Controller.putEditProduct);
router.get("/images/:slugProduct", Controller.getAllImagesBySlug);

module.exports = router;
