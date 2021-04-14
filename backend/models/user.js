const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {

        type : String,
        required : true,
    },
    email : {

        type : String,
        trim : true,
        lowercase : true,
        unique : true,
        required : true,
    },
    password : {

        type : String,
        required : true,
    },
    contactNo : {

        type : String,
        maxlength : 10,
        minlength : 10,
        required : true,
    },
    // mode : {
    //     type : String,
    //     default : "email",
    //     required : true,
    // },
    // Cart : [
    //     {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref : "Product",
    //     }
    // ],
    // modeVerified: {
    //     type : Boolean,
    //     default : false,
    // }

});

const User = mongoose.model('User', userSchema);
module.exports = User;