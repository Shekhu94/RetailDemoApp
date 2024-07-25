const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.delete("/delete/:id", cartController.deleteFromCart);

module.exports = router;
