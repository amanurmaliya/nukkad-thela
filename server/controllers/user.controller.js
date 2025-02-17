const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.signUp = async (req, res) => {
  try {
    const { name, email, phone, password} = req.body;

    if (!name || !email || !phone || !password ) {
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

    //  Validate if the user Already Exists then do not allow the user to signin insteat send him to login
    const userExists = await User.findOne({email: email});
    if(userExists)
    {
      return res.status(404).json({
        success : false,
        message : "The User Already Exists With This Email Kindly Login to Continue",
      })
    }

    // Now first of all verify the Email Address given by the user such that he has given the correct email address

    // Make the 10 rounds of hashing before saving it into the database
    const hashPassword = await bcrypt.hash(password, 10);
      
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

