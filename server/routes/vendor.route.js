const express = require("express")

const {createDish, showDishes, deleteDish} = require("../controllers/dish.controller.js")
const {likeOrDislike, createRatingAndReview, deleteRatingAndReview} = require("../controllers/ratingAndReviews.controller.js");
const { createVendor, createShop, photoUploadUsingMulterAndCloudinary, showOrders, vendorLogin, changeStatus, getShopDetails, getShopReviews } = require("../controllers/vendor.controller.js");
const { upload } = require("../middlewares/multer.middleware.js");
const sendOTP = require("../utils/sendMail.js");
const { verifyToken } = require("../middlewares/authMiddleware.js");
const verifyVendor = require("../middlewares/veriyVendor.middleware.js");
const verifyUser = require("../middlewares/verifyUser.middleware.js");

// Creating the router
const vendorRouter = express.Router();


// Create the dish 

vendorRouter.post("/sendotp", sendOTP);

// The middleware verify token adds the user information to the req.body
vendorRouter.post("/createdish",verifyToken, createDish)

vendorRouter.post("/likeordislike", likeOrDislike)
vendorRouter.post("/createratingandreview",verifyUser, createRatingAndReview)
vendorRouter.post("/deleteratingandreview", deleteRatingAndReview)
vendorRouter.post("/createvendor", createVendor)
vendorRouter.post("/createshop", verifyToken, createShop)
vendorRouter.get("/showorders",verifyVendor, showOrders)
vendorRouter.post("/login", vendorLogin)
vendorRouter.post("/changestatus", changeStatus);

// getting the dishes
vendorRouter.get("/showdishes", verifyVendor, showDishes)

// delteting the dish
vendorRouter.delete('/deletedish/:dishId', verifyVendor, deleteDish)

// This is the temp link
vendorRouter.post("/photoupload", upload.single('shopphoto'), photoUploadUsingMulterAndCloudinary)


// This is used to show the vendor information in the dashboard
vendorRouter.get('/getshopdetails',verifyVendor, getShopDetails);

vendorRouter.get('/showreviews', verifyVendor, getShopReviews)

module.exports = vendorRouter
