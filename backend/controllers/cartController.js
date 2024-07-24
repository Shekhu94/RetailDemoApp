const fs = require("fs");
exports.getCart = (req, res) => {
  fs.readFile("./mockedJsons/cart.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading mock data");
      console.log(err);
      return;
    }
    let cartData = JSON.parse(data);
    let totalPrice = 0;
    cartData = cartData.map((x) => {
      x.price.finalPrice = x.price?.finalPrice * x.quantity;
      totalPrice += x.price.finalPrice;
      x.price.strikedPrice = x.price?.strikedPrice * x.quantity;
      return x;
    });

    res.json({ cartData, totalPrice });
  });
};

// add to cart

exports.addToCart = (req, res) => {
  const requestBody = req.body;
  console.log("Received data:", requestBody);
  let newData = {
    productId: req.body.productId,
    quantity: req.body.quantity,
    size: req.body.size,
    image: req.body.image,
    price: req.body.price,
    productName: req.body.productName,
  };

  fs.readFile("./mockedJsons/cart.json", "utf8", (err, data) => {
    let cartArr = [];
    if (err) {
      console.error(err);
      return;
    }

    // Parse the JSON data
    let json = JSON.parse(data);

    // Append the new data

    // Convert back to JSON string
    const updatedJson =
      Object.entries(json).length !== 0
        ? JSON.stringify([...json, newData], null, 2)
        : JSON.stringify([newData], null, 2);

    // Write the updated JSON back to the file
    fs.writeFile("./mockedJsons/cart.json", updatedJson, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      res.status(200).json({
        success: true,
        message: "Request was successful!",
      });
    });
  });
};
