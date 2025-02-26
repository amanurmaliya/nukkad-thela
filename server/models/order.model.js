const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    "orderId" : {
        type : String,
        unique: true,
        required: true,
    },
    "shopId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Shop",
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
    "productQuantity":
    {
        type : Number,
        default : 1
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
},
{ timestamps: true }); // This will automatically add createdAt and updatedAt fields


const Order = mongoose.model("Order", orderSchema);

module.exports = Order