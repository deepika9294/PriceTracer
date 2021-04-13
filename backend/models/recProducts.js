const mongoose  = require('mongoose');

const recProductSchema = new mongoose.Schema({
    owner : {
        id : mongoose.Schema.Types.ObjectId,
        productURL : String,
        productName : String,
        required: true,
    },
    website : {
        type : String,
        trim : true,
        required : true,
    },
    productName : {
        type : String,
        required : true,
    },
    productURL : {
        type : String,
        trim : true,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    }
});

const RecProduct  = mongoose.model('RecProduct', recProductSchema);
module.exports = RecProduct;