const mongoose = require("mongoose")

const Vendor = require("../models/vendor.model.js")

const Shop = require("../models/shop.model.js")

const Order = require("../models/order.model.js")

// get the file uploading settings from the middlewares
const upload = require("../middlewares/multer.middleware.js")
const uploadOnCloudinary = require("../utils/cloudinary.js")
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const createVendor = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Kindly fill all required details to create an account",
      });
    }

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({
        success: false,
        message: "A vendor with this email already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new vendor
    const newVendor = await Vendor.create({
      name,
      email,
      password: hashedPassword, // Store hashed password
      phone: phone || "", // Default to empty string if no phone is provided
    });

    if (!newVendor) {
      return res.status(500).json({
        success: false,
        message: "Failed to create account. Please try again",
      });
    }

    // Return success response (No JWT token generation here)
    return res.status(201).json({
      success: true,
      message: "Vendor Account Created Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create account due to server error. Please try again",
      error: error.message,
    });
  }
};


const createShop = async (req, res) => {
    try {
        const { shopName, description, location, image } = req.body;
        console.log("User ID:", req.user._id);

        // Ensure all required fields are provided
        if (!shopName || !description || !location) {
            return res.status(400).json({
                success: false,
                message: "Kindly enter all details to create a shop",
            });
        }

        // Find the vendor who is creating the shop
        const vendor = await Vendor.findById(req.user._id);
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }

        let shop;
        
        // If vendor already has a shop, update it
        if (vendor.shop) {
            shop = await Shop.findByIdAndUpdate(
                vendor.shop,  // Fix: Use vendor.shop instead of vendor.shopId
                { shopName, description, location, image },
                { new: true } // Ensure it returns updated shop
            );
            return res.status(200).json({
                success: true,
                message: "Shop details updated successfully",
                shop,
            });
        }

        // If no shop exists, create a new one
        shop = await Shop.create({ shopName, description, location, image });

        // Store the newly created shop ID in the Vendor table
        vendor.shop = shop._id;  // Fix: Correctly assign the shop ID
        await vendor.save();

        return res.status(201).json({
            success: true,
            message: "New Shop Created Successfully",
            shop,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create or update shop due to a server error",
            error: error.message,
        });
    }
};


// const photoUploadUsingMulterAndCloudinary = async (req, res, next) => {

//     if(!req.file)
//     {
//         return res.send("No file found")
//     }
    
//     // This will have the path of the image
//     console.log("the file is ", req.file)
//     let localFilePath = req.file.path;
//     // This will upload the local file to the cloudinary
//     const result = await uploadOnCloudinary(localFilePath)
 
//     // Return the required result to the server
//     return res.status(200).json({
//         success: true, 
//         data: result
//     })

// }

const photoUploadUsingMulterAndCloudinary = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file found" });
        }

        console.log("Uploading file:", req.file.originalname);

        const fileBuffer = req.file.buffer; // Get file buffer
        const fileFormat = req.file.mimetype.split("/")[1]; // Extract file format

        const result = await uploadOnCloudinary(fileBuffer, fileFormat);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Upload failed", error });
    }
};


const showOrders = async (req, res) => {
    try {
        // Extract vendorId from request (assuming it's sent as a query param or in req.user)
        const vendorId = req.query?.vendorId || req.user?.id || "abc"; 

        // Validate vendorId
        if (!vendorId) {
            return res.status(400).json({ success: false, message: "Vendor ID is required" });
        }

        // Fetch orders where vendorId matches
        // const orders = await Order.find({ vendorId });
        const dummyOrders = [
            {
              orderId: "ORD12345",
              vendorId: "65b32c3f5a4bcd123456789a", // Replace with an actual Vendor ID from your DB
              userId: "name1", // Replace with an actual User ID from your DB
              productName: "Cheese Pizza",
              productPrice: 250,
              paymentStatus: "Success",
              orderStatus: "Pending"
            },
            {
              orderId: "ORD12346",
              vendorId: "65b32c3f5a4bcd123456789a",
              userId: "name2",
              productName: "Veg Burger",
              productPrice: 120,
              paymentStatus: "Success",
              orderStatus: "Cooking"
            },
            {
              orderId: "ORD12347",
              vendorId: "65b32c3f5a4bcd123456789d",
              userId: "name3",
              productName: "Chicken Biryani",
              productPrice: 350,
              paymentStatus: "Failure",
              orderStatus: "Pending"
            }
          ];

        // Return the orders in JSON format
        return res.status(200).json({ success: true, orders : dummyOrders});

    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


exports.vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Kindly enter both email and password to login",
      });
    }

    // Check if vendor exists
    const vendorExists = await Vendor.findOne({ email });

    if (!vendorExists) {
      return res.status(401).json({
        success: false,
        message: "Sorry, no vendor exists with this Email",
      });
    }

    // Compare the entered password with the hashed password
    const matched = await bcrypt.compare(password, vendorExists.password);

    if (!matched) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    // Create a JWT payload
    const payload = {
      _id: vendorExists._id,
      email: vendorExists.email,
      shopId: vendorExists.shopId, // Assuming the vendor has a shopId
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Store the token in cookies
    res.cookie("vendorInfo", token, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // Secure cookie in production
      sameSite: "Strict", // CSRF protection
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: `Welcome ${vendorExists.name}`,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Sorry, cannot be logged in due to server error",
      error: error.message,
    });
  }
};


// This syntax is also used to export multiple functions from files
exports.createVendor = createVendor
exports.createShop = createShop
exports.photoUploadUsingMulterAndCloudinary = photoUploadUsingMulterAndCloudinary
exports.showOrders = showOrders