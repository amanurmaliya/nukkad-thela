const mongoose = require("mongoose")

const dishSchema = mongoose.Schema({
    "name" : {
        type : String,
        required : true,
        trim : true
    },
    "description" : {
        type : String,
        trim : true,
    },
    "price" : {
        type : Number,
        required: true,
    },
    "category" : {
        type : String,
        enum : ["Veg", "Non-Veg", "Chinese", "Spicy"],
        required : true,
    },
    "timeToCook" : {
        type : Number,
        required : true,
    },
    "image" : {
        type : String,
    }
})

const Dish = mongoose.model("Dish", dishSchema)

module.exports = Dish