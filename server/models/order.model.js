const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    "orderId" : {
        type : String,
        unique: true,
        required: true,
    },
    "vendorId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Vendor",
        required : true
    }, 
    "userId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    "productName" : {
        type : String,
        required : true,
    },
    "productPrice" : {
        type : Number,
        required : true,
    },
    "paymentStatus" : {
        type : String,
        enum : ["Success", "Failure"],
        required : true,
    },
    "orderStatus" : {
        type : String,
        enum : ["Pending", "Cooking", "Delivered"],
        default : "Pending",
        required : true,
    }
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order