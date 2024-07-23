const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/:id", cartController.getCart);
router.post("/", cartController.addToCart);

module.exports = router;
