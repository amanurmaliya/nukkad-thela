const express = require("express");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/order.model.js");

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

        const userId = res.cookies.userId
        console.log(userId)
        if (!amount || !userId || !vendorId || !productName) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const options = {
            amount: amount * 100,  // Razorpay works in paise (₹1 = 100 paise)
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
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, vendorId, productName, productPrice } = req.body;

        const userId = req.cookies.userId
        console.log("User id is : ",userId)
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid Payment Signature" });
        }

        // ✅ Step 3: Save order in database
        const newOrder = new Order({
            orderId: razorpay_order_id,
            vendorId,
            userId,
            productName,
            productPrice,
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
