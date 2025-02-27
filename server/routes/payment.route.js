const express = require("express");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/order.model.js");

const jwt = require("jsonwebtoken");  // ✅ Import JWT

dotenv.config();

const router = express.Router();


// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});

// ✅ Step 1: Create Razorpay Order
router.post("/createorder", async (req, res) => {
    try {
        const { amount, vendorId, productName } = req.body;

        const token = req.cookies.userInfo
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key
        const userId = decoded._id
        if (!amount || !userId || !vendorId || !productName) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        
        
        const options = {
            amount: amount,  // Razorpay works in paise (₹1 = 100 paise)
            currency: "INR",
            receipt: `order_rcpt_${Date.now()}`,
            payment_capture: 1  // Auto capture payment
        };

        const order = await razorpay.orders.create(options);

        return res.status(201).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ✅ Step 2: Verify Payment and Save Order
router.post("/verifypayment", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, vendorId, productName, productPrice, productQuantity } = req.body;

        const token = req.cookies.userInfo
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        .update(body)
        .digest("hex");
        
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid Payment Signature" });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded._id

        // ✅ Step 3: Save order in database
        const newOrder = new Order({
            orderId: razorpay_order_id,
            shopId : vendorId,
            userId,
            productName,
            productPrice,
            productQuantity,
            paymentStatus: "Success",
            orderStatus: "Pending"
        });

        await newOrder.save();

        return res.status(200).json({ success: true, message: "Payment Verified & Order Created" });

    } catch (error) {
        console.error("Payment verification failed:", error);
        res.status(500).json({ success: false, message: "Payment Verification Failed" });
    }
});


module.exports = router;
