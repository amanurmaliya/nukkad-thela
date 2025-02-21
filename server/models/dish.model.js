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