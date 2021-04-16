const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    owner : {
        type : mongoose.Schema.Types.ObjectId,
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
    productData : {
        type : mongoose.Schema.Types.ObjectId,
    },
    recProducts :{
        type : mongoose.Schema.Types.ObjectId,
    }
        

});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
