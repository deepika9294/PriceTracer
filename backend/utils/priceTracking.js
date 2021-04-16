const puppeteer   = require('puppeteer');
const cheerio     = require('cheerio');
const { CronJob } = require('cron');
const ProductData = require('../models/productData');
const Product     = require('../models/product');

const browserConfig = async(productURL) =>{
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(productURL);

    return page;
}

function priceComparator(currentPrice, threshold){
    if(currentPrice <= threshold)
        return true;
    return false;
}


const extractPrice = async (page, thresholdPrice, productName, pid) => {

    await page.reload();
    
    const html = await page.evaluate(()=>{
        return document.body.innerHTML;
    });

    const $_parsed_html = cheerio.load(html);

    //fetch price
    const price =  $_parsed_html('._30jeq3._16Jk6d').text();

    //clean up price
    const parsedPrice = Number(price.replace(/[^0-9.-]+/g, "" ));
    
    //invoke threashold comparator
    if(priceComparator(parsedPrice, thresholdPrice)){

        //send email notification
        console.log("BUY !!");
    }
    else{
        const data = {
            timestamp : new Date(),
            price : parsedPrice,
        }

        console.log("product pid :" + pid);

        // find the productData with owner pid else create a new data
        await ProductData.findOne({owner: pid}).then( productdata =>{
            if(productdata){

                productdata.data.push(data);
               
                productdata.save().then(()=>{
                    console.log("scrapped data added to the data array");
                }).catch(err =>{
                    console.log("error in pushin new data");
                });
            }
            else {

                // add the id of the data array to product also
                const newProductData = new ProductData();
                newProductData.owner = pid;
                newProductData.data.push(data);
                newProductData.save()
                    .then(()=> console.log("new product data"))
                    .catch(err => console.log(err));
                
                Product.findOne({_id : pid}).then((product) =>{
                    if(product){
                        product.productData = newProductData._id;
                        product.save().then(()=>{
                            console.log("updated product with data array id");
                        })
                        .catch(err =>{
                            console.log(err);
                        })
                    }
                })
            }
        });
        console.log("WAIT !!");
    }
}


const price_tracer = async (url, thresholdPrice, productName, pid) => {
    const page = await browserConfig(url);

    let job= new CronJob('*/30 * * * * *', ()=>{
        extractPrice(page, thresholdPrice, productName, pid);
    }, null, true,null, null, true);

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
