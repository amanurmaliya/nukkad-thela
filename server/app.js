const express = require("express");
const userRouter = require("./routes/user.route");
const sendOTP = require("./utils/sendMail");
// const sen

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
app.use("/api/v1", userRouter);
