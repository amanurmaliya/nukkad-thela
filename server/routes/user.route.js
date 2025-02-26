const express = require("express");
const { signUp , login, createOrder, createUser, showShops, showAllLocations, showShopDetails, showOrders} = require("../controllers/user.controller.js");
const sendOTP = require("../utils/sendMail");
const verifyUser  = require("../middlewares/verifyUser.middleware.js");

const userRouter = express.Router();

// // This is used for the signup purpose
// userRouter.post("/signup", signUp);

// This Route is used to send the otp to the user
userRouter.post("/sendotp", sendOTP);

// This Route is used for the user to login
userRouter.post('/login', login)

// This Route Will create a new Order
userRouter.post("/createorder", createOrder)

//This route will create a new user
userRouter.post("/createuser", createUser)

// This route will send all the shops that are present in a location with dish or shopname
userRouter.get("/showshop", showShops)

// this route will show me all the locations
userRouter.get("/getlocations", showAllLocations)

// Get Shop Details by ID (With Dummy Data Support)
userRouter.get('/shop/:shopId', showShopDetails);

// Get all the order Details that you have made
userRouter.get('/showorders',verifyUser, showOrders)




module.exports = userRouter;
