const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name : {

        type : String,
        required : true,
    },
    Email : {

        type : String,
        trim : true,
        lowercase : true,
        unique : true,
        required :  "Email address is required",
    },
    Password : {

        type : String,
        required : true,
    },
    ContactNo : {

        type : String,
        maxlength : 10,
        minlength : 10,
        required : true,
    },
    Mode : {
        type : String,
        default : "email",
        required : true,
    },
    Cart : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
        }
    ],
    modeVerified: {
        type : Boolean,
        default : false,
    }

});

const User = mongoose.model('User', userSchema);
module.exports = User;