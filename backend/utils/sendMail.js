
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = (product, sendTo) =>{
    let transporter  = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.EMAIL,
            pass : process.env.PASSWORD,
        }
    });

    const message = `Dear ${product.owner_name}, <h1>PRICE DROPPED !!</h1>\
                    <p> Grab the product at best price</p>\
                    <p>PRODUCT DETAILS<br><br>\
                    Product Name : + ${product.name}<br><br>\
                    Product URL  : <a href= ${product.productURL}>Know More</a><br><br>\
                    Actual Product Price : ${product.productPrice}<br><br>\
                    Current Price : ${product.currentPrice}<br><br>\
                    Threshold Price : ${product.thresholdPrice}<br><br>\
                    \
                    Thankyou for using Price Tracer</p>`

    let mailOptions = {
        from : process.env.EMAIL,
        to : sendTo,
        subject : 'Notification of Price Droped Down',
        html : message,
    }

    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log("error occured", err);
        }
        else{
            console.log("mail sent");
        }
    });
    
}

module.exports = sendMail;





