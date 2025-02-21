const mongoose = require("mongoose")

const likeSchema = mongoose.Schema({
    // We will store just the user id and we will count the number of user id's present to show the total #f likes
    "userId" : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
})

// Create a static method to get the like count
likeSchema.statics.getLikeCount = async function (userId) {
    return await this.countDocuments({ userId });
};


const Like = mongoose.model("Like", likeSchema)

module.exports = Like