const express = require("express")

// Customer | User model
const User = require("../models/user.model.js");
const axios = require("axios")

const mongoose = require("mongoose")

// get the otp model for otp
const OTP = require("../models/otp.models.js")
require("dotenv").config()

// Vendor Schema
const Vendor = require("../models/vendor.model.js")

// This is used to hash the file
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Order = require("../models/order.model.js");
const Shop = require("../models/shop.model.js")


// This is used to parese the json 




exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password, otp} = req.body;

    if (!name || !email || !phone || !password) {
      console.log(req.body)
      return res.status(400).json({
        success: false,
        message: "Kindly Fill all the entries for the Registration",
      });
    }

    if(password.length < 8)
    {
      return res.status(400).json({
        success : false,
        message : "Kindly enter the password of minimum 8 length."
      })
    }

    
    // Now first of all verify the Email Address given by the user such that he has given the correct email address
    const otpRecord = await OTP.findOne({email});

    console.log()
    // if no record found return
        if(!otpRecord) 
        {
          return res.status(404).json({
            success: false,
            message : "Kindly send the otp again"
          })
        }
    
        // if record is there match with the user otp
        const dbOtp = otpRecord.otp;
    
        if(dbOtp==otp)
        {
          return res.status(400).json({
            success: false,
            message : "OTP Do not match! Please try again"
          })
        }
        

        // Make the 10 rounds of hashing before saving it into the database
        const hashPassword = await bcrypt.hash(password, 10);
        
    
      const userExists = await User.findOne({email: email});
      if(userExists)
      {
        return res.status(404).json({
          success : false,
          message : "The User Already Exists With This Email Kindly Login to Continue",
        })
      }

      // now everything is fine hence
  
        
      const newUser = await new User({
        name,
        email,
        phone,
        password : hashPassword,
      });
  
      try
      {
        await newUser.save();
      }
      catch(error)
      {
        return res.status(500).json({
          success : false,
          message : "Sorry Failed to save the data due to the database server issue",
          error : error.message
        })
      }
    
    
    // if the user is vendor
    // if(accountType==="Vendor")
    // {
    //   const vendorExists = await Vendor.findOne({email: email});
    //   if(vendorExists)
    //   {
    //     return res.status(404).json({
    //       success : false,
    //       message : "The User Already Exists With This Email Kindly Login to Continue",
    //     })
    //   }

    //   // everything is fine hence

      
    // const newUser = await new Vendor({
    //   name,
    //   email,
    //   phone,
    //   password : hashPassword,
    // });

    // try
    // {

    //   await newUser.save();
    // }
    // catch(error)
    // {
    //   return res.status(500).json({
    //     success : false,
    //     message : "Sorry Failed to save the data due to the database server issue",
    //     error : error.message
    //   })
    // }
    // }


    return res.status(200).json({
      success: true,
      message: `Welcome ${name} to the new era of taste`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to register due to internal server error",
      error: error.message,
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Kindly enter both the email and the password to login",
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(401).json({
        success: false,
        message: "Sorry, no user exists with this Email",
      });
    }

    // Validate password
    const matched = await bcrypt.compare(password, userExists.password);
    if (!matched) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    // Prepare JWT payload
    const payload = {
      _id: userExists._id,
      email: userExists.email,
      userType: userExists.userType, // Ensure userType is stored in DB
    };

    // Generate JWT token with expiry
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set token in cookies (Secure & HTTP-only)
    res.cookie("userInfo", token, {
      httpOnly: true,
      secure: true, // Ensure this is set in production with HTTPS
      sameSite: "None", // Required for cross-origin authentication
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
    });

    // Return success response with user details (excluding password)
    return res.status(200).json({
      success: true,
      message: `Welcome ${userExists.name}`,
      user: {
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        userType: userExists.userType,
      },
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Sorry, cannot log in due to server error",
      error: error.message,
    });
  }
};


const createOrder = async (req, res) => {
  try {
    const {vendorId, userId, productName, productPrice, paymentStatus} = req.body;

    if(!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(vendorId) || !productName || !productPrice || !paymentStatus )
    {
      return res.status(400).json({
        success : false,
        message : "Kindly Enter all the details to Make Order",
        error : error
    })
    }

    try {
      const newOrder = await Order({
        vendorId, userId, productName, productPrice, paymentStatus, orderStatus : "Pending"
      })

      if(paymentStatus==="Failure")
      {
        // Push this into the client side that this order failed
        const newFailedOrder = await User.findByIdAndUpdate(
          userId,
          {$push : {orders : newOrder_id}},
          {new : true} // This is optional
          // This will return the updated document  
        )

        // There is no need to show the failed transactions to the vendor (beacause he / she may get confused)
        // but if you want you can do as done in user
        return res.status(402).json({
          success : false,
          message : "order created but payment failed"
        })
      }
      
      // yaha pe iska mtlb ye hai apka status complete ho gaya hai toh app vendor aur user dono ke order pe isse push kar do
      const updatedUserOrder = await User.findByIdAndUpdate(
        userId,
        {$push : {orders : newOrder._id}},
        {new : true}
      )

      // Also find the Vendor and push it into the currentOrders
      const updatedVendorOrder = await Vendor.findByIdAndUpdate(
        vendorId,
        {$push : {currentOrders : newOrder._id}},
        {new:true}
      )

      return res.status(201).json({
        success: true,
        message : "New Order Created SuccessFully",
        vendorOrders : updatedVendorOrder,
        userOrders : updatedUserOrder
      })
    } catch (error) {
      return res.status(500).json({
        success : false,
        message : "Failed To create the order in the db",
        error : error
    })
    }
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : "Failed To Create Order Due to internal error",
      error : error
  })
  }
}

const showShops = async (req, res) => {
  try {
    const { location, shopName, dish } = req.query; // Using query parameters

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Kindly fill in the location to get the shops",
      });
    }

    let shopDetails = [];

    // 🔹 Search by shop name
    if (shopName) {
      shopDetails = await Shop.find({
        location,
        shopName: { $regex: shopName, $options: "i" }, // Case-insensitive search
      });
    } 
    // 🔹 Search by dish name
    else if (dish) {
      shopDetails = await Shop.aggregate([
        { $match: { location } }, // Filter by location

        {
          $lookup: {
            from: "dishes", // Reference the 'dishes' collection
            localField: "dishes",
            foreignField: "_id",
            as: "dishDetails",
          },
        },

        { $match: { "dishDetails.name": { $regex: dish, $options: "i" } } }, // Case-insensitive dish search
      ]);
    } 
    // 🔹 Fetch all shops in the location
    else {
      shopDetails = await Shop.find({ location });
    }

    return res.status(200).json({
      success: true,
      shops: shopDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch shops due to an internal server error. Try again later.",
    });
  }
};


exports.showAllLocations = async (req, res) => {
  try {
    // This will take out all the unique locations of all the shops present
    const locations = await Shop.distinct("location");

    return res.status(200).json({
      success : true, locations  // send the locations with the locations name itself
    })
  } catch (error) {
    return res.status(500).json({
      success : false,
      message : "Sorry Failed to Fetch The Locations From The DB Server kindly try again Later!",
      error : error.message
    })
  }
}

const showShopDetails = async (req, res) => {
  try {
      const { shopId } = req.params;  // ✅ Extract shopId from URL params
      if (!shopId) {
          return res.status(400).json({
              success: false,
              message: "Shop ID is required",
          });
      }

      const shopDetails = await Shop.findById(shopId).populate("dishes").populate({
        path: "reviewsAndRatings",
        populate: {
            path: "userId", // ✅ This will populate user details inside each review
            select: "name email" // ✅ Select specific fields (optional)
        }
    });
      
      if (!shopDetails) {
          return res.status(404).json({
              success: false,
              message: "Shop not found",
          });
      }

      return res.status(200).json({
          success: true,
          shop: shopDetails,
      });
  } catch (error) {
      console.error("Error in showShopDetails:", error);  // Log full error
      return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: error.message, // Send error message to frontend
      });
  }
};




exports.createOrder = createOrder
exports.showShops = showShops
exports.showShopDetails = showShopDetails