const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    "email":{
        type : String,
        unique : true,
    },
    "otp": {
        type : Number,
        unique : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '5m' }, // Automatically delete after 5 minutes
    },
})

const OTP = mongoose.model("OTPSchema", otpSchema);
module.exports = OTP