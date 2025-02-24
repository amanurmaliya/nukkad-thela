const mongoose = require("mongoose")

const Like = require("../models/like.model.js")
const RatingAndReviews = require("../models/review.model.js")

// This will automatically create like and dislike the shop
const likeOrDislike = async (req, res) => {
    try {
        const {userId} = req.body;

        if(!userId) 
        {
            return res.status(404).json({
                success : true,
                message : "No user found"
            })
        }
        
        // check if the user has already liked the shop
        const likeExists = await Like.findOne({userId})

        // agar already liked nahi hai toh like kar do
        if(!likeExists)
        {
            // create 
            await Like.create({userId})

            return res.status(200).json({
                success : true,
                message : "shop liked Successfully"
            })
        }

        // agar like hai toh remove kar do
        else 
        {
            await Like.findOneAndDelete({userId});
            return res.status(200).json({
                success : true,
                message : "Shop Like Removed Successfully"
            })
        }
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message : "Failed to like or dislike due to server error",
            error
        })
    }
};

// create a comment 
const createRatingAndReview = async (req, res) => {
    try {
        const {comment, rate, userId="gvhggh"} = req.body

        if(!comment, !rate, !userId) 
        {
            return res.status(400).json({
                success : false,
                message : "Kindly Enter all the things to rate the shop",
            })
        }

        try
        {
            const newComment = await RatingAndReviews.create({comment, rate, userId})

            if(newComment)
            {
                return res.status(201).json({
                    success : true, 
                    message : "Comment Created SuccessFully"
                })
            }
        }
        catch(error)
        {
            return res.status(400).json({
                success : false,
                message : "Failed to create the rating in the database",
                error
            })
        }
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Failed to create rating due to Internal server error",
            error : error // isse agar sirf error bhi kar dete toh same mtlb hai
        })
    }
}


const deleteRatingAndReview = async (req, res) => {
    try {
        const { commentId } = req.body;

        // Ensure commentId is provided
        if (!commentId) {
            return res.status(400).json({
                success: false,
                message: "CommentId is required"
            });
        }

        // Validate if it's a proper ObjectId
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid commentId format"
            });
        }

        // Delete the comment directly
        const deleted = await RatingAndReviews.findOneAndDelete({ _id: commentId });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Comment not found or already deleted"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Comment Deleted Successfully"
        });

    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).json({
            success: false,
            message: "Deletion of Rating and Review Failed Due to Server Error",
            error: error.message
        });
    }
};

module.exports = {likeOrDislike, createRatingAndReview, deleteRatingAndReview}
