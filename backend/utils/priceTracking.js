const puppeteer   = require('puppeteer');
const cheerio     = require('cheerio');
const { CronJob } = require('cron');
const ProductData = require('../models/productData');
const Product     = require('../models/product');
const User        = require('../models/user');
const sendMail    = require('./sendMail');

const browserConfig = async(productURL) =>{
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);

    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(productURL);

    return page;
}

function priceComparator(currentPrice, threshold){
    if(currentPrice <= threshold)
        return true;
    return false;
}


const extractPrice = async (page, thresholdPrice, productName, pid, jobs_array) => {

    await page.reload();
    
    const html =  await page.evaluate(()=>{
        return document.body.innerHTML;
    });

    const $_parsed_html = cheerio.load(html);

    //fetch price
    const price =  $_parsed_html('._30jeq3._16Jk6d').text();

    //clean up price
    const parsedPrice = Number(price.replace(/[^0-9.-]+/g, "" ));
    
    //invoke threshold comparator
    if(priceComparator(parsedPrice, thresholdPrice)){

        console.log("BUY !!");
        jobs_array.pop().job.stop();

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

                jobs_array.pop().job.stop();
                console.log("job stopped!");
            }
        });

        
    }
}


const price_tracer = async (url, thresholdPrice, productName, pid) => {
    const page = await browserConfig(url);
    const jobs_array = [];
    
    let job= new CronJob('*/30 * * * * *', () => {
        extractPrice(page, thresholdPrice, productName, pid, jobs_array)
                
    }, null, true,null, null, true);

    const  job_wip = {
        pid : pid,
        job : job,
    }

    jobs_array.push(job_wip);
    console.log(jobs_array);
    job.start(); 
}

const priceTracking = async (url, thresholdPrice, productName, pid) =>{
    
    const page = await browserConfig(url);

    //get the html content from the page
    await page.reload();
    
    const html = await page.evaluate(()=>{
        return document.body.innerHTML;
    });

    const $_parsed_html = cheerio.load(html);

    //invoke price tracker
    await price_tracer(url, thresholdPrice, productName, pid);

}

module.exports = priceTracking;
