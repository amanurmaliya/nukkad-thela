const express = require("express");

// All the user Routers are present here
const userRouter = require("./routes/user.route");

// All the Vendor Routers are present here
const vendorRouter = require("./routes/vendor.route.js")

const sendOTP = require("./utils/sendMail");

// const 

const app = express();

// Getting Connected With The Database
const connect = require('./configs/database.js')
connect;


require("dotenv").config();
const port = process.env.PORT || 3000;

// adding oof the middle wares to parse the json file
app.use(express.json());
app.listen(port, () => {
  console.log(port);
});

// mounting
app.use("/api/v1/user", userRouter);
app.use("/api/v1/vendor", vendorRouter);