const express = require("express");
const { signUp , login, createOrder, createUser, showShops, showAllLocations} = require("../controllers/user.controller.js");
const sendOTP = require("../utils/sendMail");

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
userRouter.post("/showshop", showShops)

// this route will show me all the locations
userRouter.get("/getlocations", showAllLocations)

// Get Shop Details by ID (With Dummy Data Support)
userRouter.get('/:shopId', async (req, res) => {
    try {
        const useDummyData = true; // Set to false when your DB is ready

        if (useDummyData) {
            // Dummy Data Response
            return res.status(200).json({
                _id: req.params.shopId,
                name: "Aman's Barber Shop",
                location: "Lucknow, India",
                tagline: "Style that suits you!",
                image: "https://via.placeholder.com/150", // Dummy image URL
                dishes: [
                    { name: "Haircut", price: 100 },
                    { name: "Shave", price: 50 },
                    { name: "Beard Trim", price: 80 }
                ],
                overallRating: 4.2,
                reviews: [
                    { user: "John Doe", rating: 5, comment: "Great experience!" },
                    { user: "Jane Smith", rating: 4, comment: "Good service, but a bit expensive." },
                    { user: "Alex Brown", rating: 3, comment: "Average service." },
                    { user: "Alex Brown", rating: 2, comment: "Average service." },
                    { user: "Alex Brown", rating: 1, comment: "Average service." },
                    { user: "Alex Brown", rating: 1, comment: "Average service." },
                    { user: "Alex Brown", rating: 1, comment: "Average service." },
                    { user: "Alex Brown", rating: 1, comment: "Average service." },
                ]
            });
        }

        // Real Database Query (Replace `useDummyData = false` to enable)
        const shop = await Shop.findById(req.params.shopId);
        if (!shop) return res.status(404).json({ success: false, message: 'Shop not found' });

        // Fetch reviews related to the shop
        const reviews = await ReviewAndRating.find({ shopId: req.params.shopId });

        res.status(200).json({
            ...shop._doc, // Spread shop details
            reviews: reviews || [], // Attach reviews
            overallRating: reviews.length
                ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                : "No ratings yet"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
});




module.exports = userRouter;
