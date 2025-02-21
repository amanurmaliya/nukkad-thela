const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    "email":{
        type : String,
        unique : true,
    },
    "otp": {
        type : Number,
        // unique : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 , // Automatically delete after 5 minutes
    },
})

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP