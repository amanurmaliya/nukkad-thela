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
    "orderId" : {
        type : mongoose.Schema.Types.ObjectId, // This is the reference to the other model
        ref  : "Order", // This is the model that it is referring to
    },
    
    "socketId" : {
        type : String,
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User