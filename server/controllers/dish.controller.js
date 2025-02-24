const Dish = require("../models/dish.model.js")
const Shop = require("../models/shop.model.js")
const Vendor = require("../models/vendor.model.js")

const createDish = async (req, res) => {
    try {
        const { name, description, timeToCook, price, category } = req.body;

        // Here req?.user => ? means if req is there then in request find user
        const vendorId = req?.user?._id; // Assuming authentication middleware sets req.user

        if (!name || !timeToCook || !price) {
            return res.status(400).json({
                success: false,
                message: "Name & timeToCook & price are mandatory. Kindly fill these details."
            });
        }

        // 1️⃣ Check if the vendor exists and has a shop
        const vendor = await Vendor.findById(vendorId).populate("shop"); // 'shop' stores the shop ID

        // If either of the following is not found then we must create the shop first and then return back
        if (!vendor || !vendor.shop) {
            return res.status(403).json({
                success: false,
                message: "Kindly Create the Shop First.!"
            });
        }

        // 2️⃣ Create new dish
        const newDish = new Dish({
            name,
            description: description ? description : "No Description",
            timeToCook,
            price,
            category
        });

        await newDish.save(); // Save the dish to the database

        // 3️⃣ Link dish to the shop
        const shop = vendor.shop;
        shop.dishes.push(newDish._id);
        await shop.save(); // Save updated shop document

        return res.status(200).json({
            success: true,
            message: "Dish created successfully",
            dishId: newDish._id
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error.message}"Server error while creating the dish"`,
            error: error.message
        });
    }
};


module.exports = {createDish}