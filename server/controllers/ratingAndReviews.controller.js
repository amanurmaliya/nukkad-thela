const mongoose = require("mongoose")

const Like = require("../models/like.model.js")
const RatingAndReviews = require("../models/review.model.js")
const jwt = require("jsonwebtoken");
const Shop = require("../models/shop.model.js");

// This will automatically create like and dislike the shop
const likeOrDislike = async (req, res) => {
    try {
        const {userId} = req.body;

        if(!userId) 
        {
            return res.status(404).json({
                success : false,
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
        
        const userId = req.user.id; // Get userId from middleware; // ✅ Extract userId from token
        
        const { comment, rate, shopId } = req.body;
        // ✅ Validate input
        if (!comment || !rate || !shopId) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields: comment, rate, and shopId",
            });
        }

        // ✅ Create the rating and review
        const newComment = await RatingAndReviews.create({ comment, rate, userId });

        // ✅ If created, push review ID into `shop.reviewAndRatings`
        if (newComment) {
            await Shop.findByIdAndUpdate(shopId, {
                $push: { reviewsAndRatings: newComment._id }
            });

            return res.status(201).json({
                success: true,
                message: "Review submitted successfully",
                review: newComment
            });
        }

        return res.status(400).json({ success: false, message: "Failed to create review" });

    } catch (error) {
        console.error("Error in createRatingAndReview:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
};




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
