const nodemailer = require("nodemailer");
// const OTP = require("../models/otp.model.js")
const OTP = require("../models/otp.models.js");


require("dotenv").config();

const sendOTP = async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
    
    const receiverId = req.body.email;
    const otp  = generateOTP();


    
    const msg = `<!DOCTYPE html>
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #007bff;
            color: #ffffff;
            text-align: center;
            padding: 20px 0;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            text-align: center;
        }
        .email-body p {
            margin: 10px 0;
            font-size: 16px;
            color: #333;
        }
        .email-button {
            display: inline-block;
            margin: 20px 0;
            padding: 12px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .email-footer {
            background-color: #f4f4f4;
            color: #666;
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
        }
        .email-footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Email Verification</h1>
        </div>
        <div class="email-body">
            <p>Hello [User's Name],</p>
            <p>Thank you for signing up! Please verify your email address to complete your registration.</p>
            <a href="[VERIFICATION_LINK]" class="email-button">Your OTP : ${otp}</a>
            <p>If you didn’t sign up for this account, you can safely ignore this email.</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
            <p>
                If you have any questions, contact us at 
                <a href="mailto:panditamanurmaliya609@gmail.com">panditamanurmaliay609@gmail.com</a>.
            </p>
        </div>
    </div>
</body>
</html>
`
    let info = await transporter.sendMail({
      from: "Nukkad Thela - The Unsung Taste",
      to: receiverId,
      subject: "Verification Of The Mail Address",
      html: `${msg}`,
    });

    console.log("Message send", info.messageId);

    try{
        const otpsend = await OTP.findOneAndUpdate(
            { email: receiverId }, // Find by email
            { otp }, // Update the OTP field
            { upsert: true, new: true } // Create a new entry if not found
          );
          
    }catch{
        return res.status(500).json({
            success: false,
            message : "Otp failed to save in db",
            error : error.message
        })
    }



    return res.status(200).json({
      success: true,
      message: "Otp send Successfully! Kindly check the email and verify that",
      info: info.messageId,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "The otp cannot be sended by server please try again",
      error : error.message
    });
  }
};



module.exports = sendOTP;
