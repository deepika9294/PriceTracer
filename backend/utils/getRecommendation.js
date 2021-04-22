const fetchURL  = require('./fetchURL');
const fetchDetails = require('./fetchDetails');

const formQueryString = (website, query) =>{
    
    const params = encodeURIComponent(query);
    switch(website){
        case "paytmmall.com":
                return `https://paytmmall.com/shop/search?q=${params}&from=organic`;
        case "www.amazon.com":
                return `https://www.amazon.com/s?k=${params}&ref=nb_sb_noss_2`;
        case "www.amazon.in" :
                return `https://www.amazon.in/s?k=${params}&ref=nb_sb_noss_2`;
        case "www.snapdeal.com":
                return `https://www.snapdeal.com/search?keyword=${params}&sort=rlvncy`;
        case "www.flipkart.com":
                return `https://www.flipkart.com/search?q=${params}`;
        case "www.ebay.com":
                return `https://www.ebay.com/sch/i.html?_nkw=${params}`;
    }
}

const fetch = async (website, query, price) =>{
    const searchURL = formQueryString(website, query);
    
    const urls = await fetchURL(searchURL, website);
    
    if(urls === undefined){
        console.log("navigation error");
        return [];
    }

    console.log("length :" , urls.length);
        
    var finalisedURL = [];
    
    for(var i =0; i< urls.length; i++){
        
        var name;
        const details = await fetchDetails(website, urls[i]);
        if(details.productName === undefined){
            name = null;  
        }
        name = details.productName;
        if(productPrice < price){
            finalisedURL.push({
                url : urls[i],
                name : name || query,
                price : details.productPrice,
            });
        }

        console.log("final urls :", finalisedURL);
          
    }

    return  {
        website : website,
        urls : finalisedURL,
    }

}

const getRecommendation = async(productWebsite, query, price) =>{

    console.log("getting recommendation : ", productWebsite);
  
    var oldwebsites = ["www.amazon.in", "www.snapdeal.com", "www.flipkart.com", "paytmmall.com"];

    var websites = [];

    for(var i =0; i< oldwebsites.length; i++){
        if(oldwebsites[i] != productWebsite){
            websites.push(oldwebsites[i]);
        }
    }
    
    const data = [];
    for(var i=0; i<websites.length; i++){
        console.log("webiste :", websites[i]);
        const x = await fetch(websites[i], query, price);
        data.push(x);

    }
    console.log("returning :(");
    return data;
}

module.exports = getRecommendation;