const fs = require("fs");
exports.getCart = (req, res) => {
  fs.readFile("./mockedJsons/getProducts.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading mock data");
      console.log(err);
      return;
    }
    let allData = JSON.parse(data);
    let ids = [...req.params.id];
    let allVariants = [];
    for (let data of allData) {
      data.variants.map((x) => allVariants.push(x));
    }
    for (let id of ids) {
      console.log(allVariants.find((x) => x.id == id));
    }
  });
};

exports.addToCart = (req, res) => {
  const requestBody = req.body;
  console.log("Received data:", requestBody);
  let newData = {
    id: req.body.productId,
    quantity: req.body.quantity,
    size: req.body.size,
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
