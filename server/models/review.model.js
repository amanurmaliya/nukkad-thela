const mongoose = require("mongoose")

const reviewAndRatingSchema = mongoose.Schema({
    "comment" : {
        type : String,
        trim : true,
    },
    "rate" : {
        type : Number,
    },
    "userId" : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    }
})

const ReviewAndRating = mongoose.model("ReviewAndRating", reviewAndRatingSchema);

module.exports = ReviewAndRating