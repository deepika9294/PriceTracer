
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = (rand,sendTo) =>{
    let transporter  = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.EMAIL,
            pass : process.env.PASSWORD,
        }
    });
    const link="http://localhost:5000/users/verify?id="+rand+"&email="+sendTo;


    let mailOptions = {
        from : process.env.EMAIL,
        to : sendTo,
        subject : 'Verify Your Account for Price Tracer',
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }

    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log("error occured while verification", err);
        }
        else{
            console.log("mail sent");
            console.log(data)
        }
    });
}
module.exports = sendMail;





