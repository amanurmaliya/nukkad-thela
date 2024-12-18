const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

const connect = mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log("Connected to Db SuccessFully")}).catch((error)=>{
    console.log("connection failed with the db kindly check : ", error)
})

module.exports = connect;