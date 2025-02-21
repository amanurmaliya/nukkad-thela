// Customer | User model
const User = require("../models/user.model.js");
const axios = require("axios")

// get the otp model for otp
const OTP = require("../models/otp.models.js")
require("dotenv").config()

// Vendor Schema
const Vendor = require("../models/vendor.model.js")

// This is used to hash the file
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Order = require("../models/order.model.js");




exports.signUp = async (req, res) => {
  try {
    const { name, email, phone, password, accountType, otp} = req.body;

    if (!name || !email || !phone || !password || !accountType || !otp) {
      return res.status(401).json({
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
    
        if(dbOtp!==otp)
        {
          return res.status(400).json({
            success: false,
            message : "OTP Do not match! Please try again"
          })
        }
        

        // Make the 10 rounds of hashing before saving it into the database
        const hashPassword = await bcrypt.hash(password, 10);
        
    //  Validate if the user Already Exists then do not allow the user to signin insteat send him to login
    // if the account is of user
    if(accountType==="User")
    {
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
    }
    
    // if the user is vendor
    if(accountType==="Vendor")
    {
      const vendorExists = await Vendor.findOne({email: email});
      if(vendorExists)
      {
        return res.status(404).json({
          success : false,
          message : "The User Already Exists With This Email Kindly Login to Continue",
        })
      }

      // everything is fine hence

      
    const newUser = await new Vendor({
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
    }


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

exports.login = async (req, res) =>
{
  try{
    const {email, password} = req.body;
    
    // if you do not get the email & password both then return the user
    if(!email || !password)
    {
      return res.status(400).json({
        success : false,
        message : "Kindly enter both the email and the password to login"
      })
    }

    // find if the user exists or not with the help of email
    const userExists = await User.findOne({email}) 

    if(!userExists)
    {
      return res.status(401).json({
        success : false,
        message : "Sorry no user exists with this Email"
      })
    }

    // Now match the user password with the db password
    const matched = await bcrypt.compare(password, userExists.password)

    if(!matched)
    {
      return res.status(401).json({
        success: false,
        message : "Wrong password"
      })
    }

    // Making the payload
    const payload = {
      _id: userExists._id,
      email : userExists.email,
      socketId : userExists.socketId,
    }

    // make the token so that the user details can be stored in that in order to verify in future
    const token = jwt.sign(payload, process.env.JWT_SECRET);


    // Storing the tokens in the cookies
    res.cookie("userInfo", token);

    // Returning the status in the form of the data
    return res.status(200).json({
      success : true, 
      message : `Welcome ${userExists.name}`
    })
  }
  catch(error)
  {
    return res.status(501).json({
      success : false,
      message : "Sorry Cannot be logged in due to server error",
      error : error.message
    })
  }
}

const createOrder = async (req, res) => {
  try {
    const {vendorId, userId, productName, productPrice, paymentStatus} = req.body;

    if(!vendorId || !userId || !productName || !productPrice || !paymentStatus )
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

exports.createOrder = createOrder