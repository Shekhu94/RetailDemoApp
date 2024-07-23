const express = require("express");
const router = express.Router();

// Sample GET route
router.get("/items", (req, res) => {
  res.json({ message: "GET all items" });
});

// Sample POST route
router.post("/items", (req, res) => {
  const newItem = req.body;
  res.json({ message: "Item created", item: newItem });
});

module.exports = router;
