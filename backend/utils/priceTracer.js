const Nightmare = require('nightmare');
const nightmare = Nightmare({show:true});
const { CronJob } = require('cron');
const ProductData = require('../models/productData');
const Product     = require('../models/product');
const User        = require('../models/user');
const sendMail    = require('./sendMail');


function priceComparator(currentPrice, threshold){
    if(currentPrice <= threshold)
        return true;
    return false;
}

const comparator = async(parsedPrice, thresholdPrice, pid, jobs_array) =>{
    if(priceComparator(parsedPrice, thresholdPrice)){
        
        console.log("BUY !!");
        if(jobs_array.length !=0 ){
            jobs_array.pop().job.stop();
            console.log("job stopped!");
        }
        //send email notification
        Product.findOne({_id: pid}).then(product =>{
            if(product){
                product.isThresholdReached = true;
                product.save();
                
                User.findOne({_id : product.owner}).then(user =>{
                    if(user){
                       
                        const data = {
                            owner_name : user.name,
                            name : product.productName,
                            productURL : product.productURL,
                            currentPrice : parsedPrice,
                            productPrice : product.productPrice,
                            thresholdPrice : product.thresholdPrice,

                        }
                        console.log(data);
                        sendMail(data, user.email);
                    }
                })
            }
        })
    }
    else{
        const data = {
            timestamp : new Date(),
            price : parsedPrice,
        }

        //console.log("product pid :" + pid);
        await Product.findOne({_id : pid}).then( product =>{
            if(product){
                if(product.productData){

                    ProductData.findOne({owner : pid}).then( productdata =>{
                        
                        
                        productdata.data.push(data);
               
                        productdata.save().then(()=>{
                            console.log("data added");
                        }).catch(err =>{
                            console.log(err);
                        });

                    })
                   
                }
                else{
                    const newProductData = new ProductData();
                    newProductData.owner = pid;
                    newProductData.data.push(data);
                    newProductData.save()
                    .then(()=> console.log("data added"))
                    .catch(err => console.log(err));
                    
                    product.productData = newProductData._id;

                    product.save();
                }

                console.log("WAIT !!");
            }
            else{

                if(jobs_array.length !=0 ){
                    jobs_array.pop().job.stop();
                    console.log("job stopped!");
                }
               
            }
        });
    }
}
 
const extractPrice =  async(website, url, thresholdPrice, productName, pid, jobs_array) => {
    try {

        Nightmare.action('EBay', function(done) {
            this.evaluate_now(() => {
                try{

                    const priceString = document.querySelector("#prcIsum").innerText || "000zero";
                    const priceNumber =  Number(priceString.replace(/[^0-9.-]+/g, "" ));  
                   
                    return {
                        price: priceNumber,
                    }

                }catch(e){
                   console.log("error :",  e);
                }    
                
            }, done)
        })

        Nightmare.action('Flipkart', function(done) {
            this.evaluate_now(() => {
                try{
                    const priceString =  document.querySelector("._30jeq3._16Jk6d").innerText || "000zero";
                    const priceNumber =  Number(priceString.replace(/[^0-9.-]+/g, "" ));  
                    return {
                        price: priceNumber,
                    }
                }catch(e){
                   console.log("error :",  e);
                }    
                
            }, done)
        })


        Nightmare.action('Snapdeal', function(done) {
            this.evaluate_now(() => {
                try{
                    const priceString =document.querySelector(".payBlkBig").innerText || "000zero";
                    const priceNumber =  Number(priceString.replace(/[^0-9.-]+/g, "" ));
                    return {
                        price: priceNumber,
                    }
                }catch(e){
                    console.log("error :",  e);
                }    
                
            }, done)
        })


        Nightmare.action('Amazon', function(done) {
            this.evaluate_now(() => {
                try{
                    const priceString =(document.getElementById("priceblock_dealprice")|| document.getElementById("atfRedesign_priceblock_priceToPay") || document.getElementById("priceblock_ourprice")).innerText || 0;
                    const priceNumber =  Number(priceString.replace(/[^0-9.-]+/g, "" ));
                    return {
                        price: priceNumber,
                    }
                }catch(e){
                    console.log("error :",  e);
                }
              
            }, done)
        })

        if (website == "www.amazon.com" || website == "www.amazon.in"){
            Nightmare()
                .goto(url)
                .Amazon()
                .end()
                .then(async (Amazon) => {
                    await comparator(Amazon.price, thresholdPrice, pid, jobs_array);
                })
        }
        else if(website == "www.snapdeal.com"){
            Nightmare()
            .goto(url)
            .Snapdeal()
            .end()
            .then(async (Snapdeal) => {
                await comparator(Snapdeal.price, thresholdPrice, pid, jobs_array);
            })
        }
        else if(website == "www.flipkart.com"){
            Nightmare()
            .goto(url)
            .Flipkart()
            .end()
            .then(async (Flipkart) => {
                await comparator(Flipkart.price, thresholdPrice, pid, jobs_array);
            })
        }
        else if(website == "www.ebay.com"){
           
            const x = await Nightmare()
            .goto(url)
            .EBay()
            .end()
            .then(async (EBay) => {
                await comparator(EBay.price, thresholdPrice, pid, jobs_array);
            })

            return x;
        }   
    } 
    catch (e) {
        console.log("error :",  e);
    }

}


const priceTracking = async ( website, url, thresholdPrice, productName, pid) => {
   
    const jobs_array = [];
    
    let job = new CronJob('*/30 * * * * *', () => {
        extractPrice(website, url, thresholdPrice, productName, pid, jobs_array)
    }, null, true,null, null, true);

    const  job_wip = {
        pid : pid,
        job : job,
    }

    jobs_array.push(job_wip);
    console.log(jobs_array);

    job.start(); 
}

module.exports = priceTracking;