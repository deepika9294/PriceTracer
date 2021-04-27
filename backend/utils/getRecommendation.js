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
        case "www.ajio.com":
                return `https://www.ajio.com/search/?text=${params}`;
    }
}

const fetch = async (website, query, price, productWebsite) =>{
    const searchURL = formQueryString(website, query);
    if(productWebsite === "www.amazon.com" || productWebsite === "www.ebay.com"){
        price = price * 75;
    }
    const urls = await fetchURL(searchURL, website);
    
    if(urls === undefined){
        console.log("navigation error");
        return [];
    }

    console.log("length :" , urls.length);
        
    var finalisedURL = [];
    
    for(var i =0; i< urls.length; i++){
        
        
        
        var name = query;
        try{
            var details = await fetchDetails(website, urls[i]);
            name = details.productName;
        }
        catch(e){
            name = null;
        }
        
        console.log(details);

        try{
            if(details.productPrice < price){
                finalisedURL.push({
                    url : urls[i],
                    name : name,
                    price : details.productPrice,
                    image : details.productimgURL,
                });
            }
        }
        catch(e){
            console.log("price fetching error !");
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
        //console.log("webiste :", websites[i]);
        const x = await fetch(websites[i], query, price, productWebsite);
        data.push(x);

    }
    // console.log("returning :(");
    return data;
}

module.exports = getRecommendation;