const cheerio = require('cheerio');
const { sendHTTPRequest } = require("./sendHTTPRequest");
      
const loadHTML = async(url) =>{
    try {
		const productHtmlPage = await sendHTTPRequest(
			(method = "GET"),
			(url = url),
			(obj = {}),
			(isJSON = false)
		);
		const loadedHTML = cheerio.load(productHtmlPage);
		return loadedHTML;
	} catch (e) {
		console.log(e);
	}
}

const fetchProductDetails  = async(url) =>{

    try{
        const $_parsed_html = await loadHTML(url);
    
        //fetch product name
        const productName =  $_parsed_html('.yhB1nd').find('.B_NuCI').text();
    
        //fetch product image url
        const productimgURL =  $_parsed_html('._396cs4._2amPTt._3qGmMb._3exPp9').attr('src');
    
        //fetch price
        const price =  $_parsed_html('._30jeq3._16Jk6d').text();
    
        //clean up price
        const productPrice = Number(price.replace(/[^0-9.-]+/g, "" ));
        
        return {
            productName,
            productPrice,
            productimgURL,
        }
    
    } catch(err){
        throw "Error occured :" + err;
    }
};

module.exports = fetchProductDetails;
