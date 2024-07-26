const fs = require("fs");
var Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: "rzp_test_GCT0rSIkStB0uH",
  key_secret: "ok6BN2RysYbqPFasqBrQowRu",
});

exports.getOrderId = (req, res, next) => {
  var options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "Order0001",
    payment_capture: 0,
  };
  instance.orders.create(options, (err, order) => {
    if (err) {
      console.log(err);
      next(err);
    }
    if (order) {
      let orderJson = {
        success: true,
        status: "Order created successfully",
        orderId: order.id,
        createdAt: order.created_at,
        key: "rzp_test_GCT0rSIkStB0uH",
      };

      fs.writeFile(
        "./mockedJsons/order.json",
        JSON.stringify([orderJson]),
        "utf8",
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          res.json(orderJson);
        }
      );
    }
  });
};
