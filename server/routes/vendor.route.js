const express = require("express")

const {createDish} = require("../controllers/dish.controller.js")
const {likeOrDislike, createRatingAndReview, deleteRatingAndReview} = require("../controllers/ratingAndReviews.controller.js");
const { createVendor, createShop, photoUploadUsingMulterAndCloudinary, showOrders, vendorLogin } = require("../controllers/vendor.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const sendOTP = require("../utils/sendMail.js");
const { verifyToken } = require("../middlewares/authMiddleware.js");

// Creating the router
const vendorRouter = express.Router();


// Create the dish 

vendorRouter.post("/sendotp", sendOTP);

// The middleware verify token adds the user information to the req.body
vendorRouter.post("/createdish",verifyToken, createDish)

vendorRouter.post("/likeordislike", likeOrDislike)
vendorRouter.post("/createratingandreview", createRatingAndReview)
vendorRouter.post("/deleteratingandreview", deleteRatingAndReview)
vendorRouter.post("/createvendor", createVendor)
vendorRouter.post("/createshop", verifyToken, createShop)
vendorRouter.get("/showorders", showOrders)
vendorRouter.post("/login", vendorLogin)

// This is the temp link
vendorRouter.post("/photoupload", upload.single('shopphoto'), photoUploadUsingMulterAndCloudinary)

module.exports = vendorRouter
