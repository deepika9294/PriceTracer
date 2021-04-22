const mongoose  = require('mongoose');

const recProductSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
    },
    data : [
        {
            website : {
                type : String,
                required : true,
            },
            urls : [
                {
                    url : {
                        type : String,
                        required : true,
                    },
                    price : {
                        type : Number,
                        required : true,
                    },
                    name : {
                        type : String,
                        required : true,
                    },
                    image : {
                        type : String,
                        default : "imagerr.png",
                    }
                }
            ]
        }
    ]
});

const RecProduct  = mongoose.model('RecProduct', recProductSchema);
module.exports = RecProduct;