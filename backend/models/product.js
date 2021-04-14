const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    owner : {

        id : mongoose.Schema.Types.ObjectId,
        Email : String,
        Name : String,
        required : true,
    },
    productName : {
        type : String,
        required : true,
    },
    productImage : {
        type : String,
        default : "imgerror.jpeg",
    },
    productURL : {
        type : String,
        required : true,
        trim : true,
    },
    productWebsite : {
        type : String,
        trim : true,
        required : true,
    },
    thresholdPrice : {
        type : Number,
        required : true,
    },
    isThresholdReached : {
        type : Boolean,
        default : false,
    },
    productData : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "ProductData",
        }
    ],
    recProducts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "RecProduct",
        }
    ]

});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
