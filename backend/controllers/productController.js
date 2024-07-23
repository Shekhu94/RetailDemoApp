const fs = require("fs");
exports.getAllProducts = (req, res) => {
  fs.readFile("./mockedJsons/getProducts.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading mock data");
      console.log(err);
      return;
    }
    res.json(JSON.parse(data));
  });
};
