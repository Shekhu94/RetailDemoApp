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
      res.json({
        success: true,
        status: "Order created successfully",
        value: order,
        key: "rzp_test_GCT0rSIkStB0uH",
      });
    }
  });
};
