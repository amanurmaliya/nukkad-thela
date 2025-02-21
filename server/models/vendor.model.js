const mongoose = require("mongoose")

const vendorSchema = mongoose.Schema({
    "name" : {
        type : String,
        required : true,
        trim : true,
    },
    "email" : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    "password" : {
        type : String,
        required : true,
    },
    "phone" : {
        type : Number,
    },
    "shop" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Shop",
    },





    // You can use the wallet too to store how much money the each vendor has right now
})

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor