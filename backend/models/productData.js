const mongoose = require('mongoose');

const productDataSchema = new mongoose.Schema({
    
    owner : {
        id : mongoose.Schema.Types.ObjectId,
        productURL : String,
        productName : String,
        required : true,
    },
    timestamp : {
        Day : {
            type : String,
            required : true,
        },
        Date : {
            type : String,
            required : true,
        },
        Time : {
            type : String,
            required : true,
        }
    },
    price : {
        type : Number,
        required : true,
    }


});

const ProductData = mongoose.model('ProductData', productDataSchema);
module.exports = ProductData;