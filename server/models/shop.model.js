const mongoose = require("mongoose")
const Order = require("./order.model.js")
const shopSchema = mongoose.Schema({
    "shopName" : {
        type : String,
        required : true,
        trim : true,
    },
    "description" : {
        type : String,
        trim : true,
    },
    "dishes" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Dish"
    },
    "orderInfo" :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref : Order,
    }],
    "currentOrders" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : Order,
    }],
    "notifications" : {
        type : Number,
        default: 0,
    }, 
    "reviewsAndRatings" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "ReviewAndRating"
    }], 
    "likes" : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Like"
    }],
    "image" : {
        type : String,
        trim : true,
    },
    "location" : {
        type : String,
        trim : true,
    }
})

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop