const puppeteer   = require('puppeteer');
const cheerio     = require('cheerio');
const {CronJob}        = require('cron');

const productURL = "https://www.myntra.com/tshirts/chalk-by-pantaloons/chalk-by-pantaloons-girls-navy-blue-striped-polo-collar-t-shirt/13750840/buy";

const threshold = 100;


async function browserConfig(){
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(productURL);

    return page;
}

async function getProductName($_parsed_html){
    const name =  $_parsed_html('.pdp-name').innerHTML();
    return name;
}


function priceComparator(currentPrice){
    if(currentPrice <= threshold)
        return true;
    return false;
}

async function extractPrice(page){

    page.reload()
    
    const html = page.evaluate(()=>{
        return document.body.innerHTML;
    });

    const $_parsed_html = cheerio.load(html);

    //fetch price
    const price =  $_parsed_html('.pdp-price').text();
    console.log(price);
    
    //clean up price
    const parsedPrice = Number(price.replace(/[^0-9.-]+/g, "" ));
 
    //invoke threashold comparator
    if(priceComparator(parsedPrice)){
        console.log("BUY!!")
    }
    else{
        console.log("WAIT !!");
    }
}

async function price_tracer(){
    const page = await browserConfig();
    let job= new CronJob('*/30 * * * * *', ()=>{
        extractPrice(page)
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

    // const image = $_parsed_html('._3v_O').attr('src');
    
    // console.log("image url : " + image);

    //invoke price tracker
    await price_tracer();

    console.log("ended!");

})();



