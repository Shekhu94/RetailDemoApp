const fs = require("fs");
exports.getOffers = (req, res) => {
  fs.readFile("./backend/mockedJsons/offers.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading mock data");
      console.log(err);
      return;
    }
    let offersData = JSON.parse(data);

    res.json([...offersData]);
  });
};
