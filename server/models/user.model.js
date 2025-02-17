const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    "name" : {
        type : String,
        required : true,
        trim : true
    },
    "email" : {
        type : String,
        required : true,
        trim: true,
    },
    "phone" : {
        type : Number,
        required : true,
        // This will help that it will not send the password each time we ask for the data
        // select : false
    },
    "password" : {
        type : String,
        required : true,
    },
    "userType":{
        type : String,
        required : true,
        enum : ['Captains', 'Hero'] // Captains are the Street Vendors and Heros are the users who eat & taste the food
    },
    "socketId" : {
        type : String,
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User