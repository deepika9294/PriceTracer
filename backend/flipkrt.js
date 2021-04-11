const puppeteer   = require('puppeteer');
const cheerio     = require('cheerio');
const { CronJob } = require('cron');

const productURL = "https://www.flipkart.com/realme-c11-rich-green-32-gb/p/itm831d19fd9cdc4";

const threshold = 7800;

async function browserConfig(){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(productURL);

    return page;
}

async function getProductName($_parsed_html){
    const name =  $_parsed_html('.yhB1nd').find('.B_NuCI').text();
    return name;
}


function priceComparator(currentPrice){
    if(currentPrice <= threshold)
        return true;
    return false;
}

async function extractPrice(page){

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
    if(priceComparator(parsedPrice)){
        console.log("BUY !!");
    }
    else{
        console.log("WAIT !!");
    }
}

async function price_tracer(){
    const page = await browserConfig();

    let job= new CronJob('*/30 * * * * *', ()=>{
        extractPrice(page);
    }, null, true,null, null, true);

    job.start(); 
}

( async () =>{
    
    const page = await browserConfig();

    //get the html content from the page
    await page.reload();
    
    const html = await page.evaluate(()=>{
        return document.body.innerHTML;
    });

    const $_parsed_html = cheerio.load(html);
    
    //fetch product name
    const productName = await getProductName($_parsed_html);
    console.log(productName);

    //invoke price tracker
    await price_tracer();

})();



