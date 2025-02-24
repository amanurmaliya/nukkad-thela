const express = require("express");

// All the user Routers are present here
const userRouter = require("./routes/user.route");


// All the Vendor Routers are present here
const vendorRouter = require("./routes/vendor.route.js")

// All The payment api's are implemented
const paymentRouter = require("./routes/payment.route.js")

const sendOTP = require("./utils/sendMail");

// Get the cookie parse
const cookieParser = require("cookie-parser")

// cross origin resource sharing
const cors = require("cors") 

const app = express();

// Getting Connected With The Database
const connect = require('./configs/database.js')
connect;


require("dotenv").config();
const port = process.env.PORT || 3000;

// adding oof the middle wares to parse the json file
app.use(express.json());

app.use(express.urlencoded({extended: true, limit:"16kb"}))

app.use(cookieParser());

// This will allow the data to be used from this cross origin
app.use(cors({
  origin : process.env.CORS_ORIGIN,
  credentials : true
}))

app.listen(port, () => {
  console.log(port);
});

// mounting
app.use("/api/v1/user", userRouter);
app.use("/api/v1/vendor", vendorRouter);
app.use("/api/v1/payment", paymentRouter)