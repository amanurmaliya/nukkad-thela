const Razorpay = require("razorpay")

require("dotenv").config()

var instance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET',
});

module.exports = instance