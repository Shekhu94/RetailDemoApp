const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

//router.get("/", orderController.getOrderDetails);
router.post("/", orderController.getOrderId);

module.exports = router;
