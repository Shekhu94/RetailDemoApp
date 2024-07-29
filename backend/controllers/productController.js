const fs = require("fs");
exports.getAllProducts = (req, res) => {
  fs.readFile("./mockedJsons/products.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading mock data");
      console.log(err);
      return;
    }
    let productData = JSON.parse(data);
    if (req.params.category && req.params.category != "") {
      productData = productData.filter(
        (x) => x.category.toUpperCase() == req.params.category.toUpperCase()
      );
    }
    res.json(productData);
  });
};

exports.getProductDetails = (req, res) => {
  let id = req.params.id;
  fs.readFile("./mockedJsons/products.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading mock data");
      console.log(err);
      return;
    }

    let productDetails = JSON.parse(data);
    productDetails = productDetails.filter((x) => x.id == id);
    res.json(productDetails);
  });
};
