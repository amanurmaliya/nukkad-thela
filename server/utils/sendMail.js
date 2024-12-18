const nodemailer = require("nodemailer");

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

    const receiverId = req.body.receiverId;
    const { msg, otp } = req.body;
    let info = await transporter.sendMail({
      from: "Nukkad Thela - The Unsung Taste",
      to: receiverId,
      text: "Radhe Radhe",
      html: `${msg} ${otp}`,
    });

    console.log("Message send", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Otp send kindly check the email and verify that",
      info: info.messageId,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "The otp cannot be sended by server please try again",
    });
  }
};

module.exports = sendOTP;
