const mongoose = require('mongoose');

const productDataSchema = new mongoose.Schema({
    
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    data : [
        {
            timestamp : {
                type : Date,
                required : true,
            },
            price : {
                type : Number,
                required : true,
            }

        }
    ]
});

const ProductData = mongoose.model('ProductData', productDataSchema);
module.exports = ProductData;