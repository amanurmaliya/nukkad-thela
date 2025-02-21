const express = require("express");
const { signUp , login, createOrder} = require("../controllers/user.controller.js");
const sendOTP = require("../utils/sendMail");

const userRouter = express.Router();

// This is used for the signup purpose
userRouter.post("/signup", signUp);

// This Route is used to send the otp to the user
userRouter.post("/sendotp", sendOTP);

// This Route is used for the user to login
userRouter.get('/login', login)

// This Route Will create a new Order
userRouter.post("/createorder", createOrder)

module.exports = userRouter;
