const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:category", productController.getAllProducts);
router.get("/details/:id", productController.getProductDetails);

module.exports = router;
