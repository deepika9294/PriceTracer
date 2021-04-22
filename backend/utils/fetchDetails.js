const Nightmare = require('nightmare')
const nightmare = Nightmare({show:true})

const fetchDetails = async (website, url) => {
    
    try {

        //sorted
        Nightmare.action('EBay', function(done) {
            this.evaluate_now(() => {
                try{
                    
                    var classes = ["#prcIsum", "#prcIsum_bidPrice"];

                    for(var i=0; i<classes.length; i++){
                        try{
                            var priceString =  document.querySelector(classes[i]).innerText;
                            break;
                        }
                        catch(error){
                            priceString = null;
                        }
                        
                    }

                    //const priceString = document.querySelector("#prcIsum").innerText || document.querySelector("#prcIsum_bidPrice").innerText || "000zero";
                    const pname = document.querySelector("#itemTitle").innerText|| "Name";
                    const image = document.querySelector("#icImg").src;
                   
                    return {
                        pString : priceString,
                        name : pname,
                        image : image,
                    }

                }catch(e){
                   console.log("error :",  e);
                }    
                
            }, done)
        })

        //sorted
        Nightmare.action('Flipkart', function(done) {
            this.evaluate_now(() => {
                try{
              
                    const priceString = document.querySelector("._30jeq3._16Jk6d").innerText || "000zero";
                    const pname = document.querySelector(".B_NuCI").innerText|| "Name";
                    try{
                        var image2 = document.querySelector("._396cs4._2amPTt._3qGmMb._3exPp9").src ;
                        
                    }
                    catch(e){
                       image2 = null;
                    }
                    try{
                        var image1 = document.querySelector("._2r_T1I._396QI4").src;
                    }
                    catch(e){
                        image1 = null;
                     }
                  
                  
                    return {
                        pString : priceString,
                        name : pname,
                        image1 : image1,
                        image2 : image2,
                    }
                  
                 
                    
                }catch(e){
                   console.log("error :",  e);
                }    
                
            }, done)
        })

        //sorted
        Nightmare.action('Snapdeal', function(done) {
            this.evaluate_now(() => {
                try{
                    const priceString =document.querySelector(".payBlkBig").innerText || "000zero";
                    const pname = document.querySelector(".pdp-e-i-head").innerText|| "Name";
                    const image = document.querySelector(".cloudzoom").src;
                   
                    return {
                        pString : priceString,
                        name : pname,
                        image : image,
                    }
                }catch(e){
                    console.log("error :",  e);
                }    
                
            }, done)
        })

        //sorted
        Nightmare.action('Amazon', function(done) {
            this.evaluate_now(() => {

                var classes= ["priceblock_dealprice", "atfRedesign_priceblock_priceToPay", "priceblock_ourprice", "a-price-whole", "priceblock_saleprice"];

                for(var i = 0; i< classes.length; i++){
                    try{
                        var priceString = document.getElementById(classes[i]).innerText;
                        break;
                    }
                    catch(err){
                        priceString = null;
                    }
                }

                //const priceString = (document.getElementById("priceblock_dealprice").innerText|| document.getElementById("atfRedesign_priceblock_priceToPay").innerText || document.getElementById("priceblock_ourprice")).innerText || document.getElementsByClassName('a-price-whole').innerText || document.getElementById("priceblock_saleprice").innerText;
                const pname = document.getElementById("productTitle").innerText || document.getElementById('title').innerText || null;
                const image = document.getElementById("landingImage").src;
                return {
                    pString : priceString,
                    name : pname,
                    image : image
                }
            }, done)
        })

        //sorted
        Nightmare.action('Paytmmall', function(done) {
            this.evaluate_now(() => {
            
                const priceString =document.querySelector('._1V3w').innerText;
                const pname = document.querySelector(".NZJI").innerText;
                const image = document.querySelector("._3v_O").src;
                return {
                    pString : priceString,
                    name : pname,
                    image : image,
                }
            }, done)
        })


        if (website == "www.amazon.com" || website == "www.amazon.in"){
            const x = await Nightmare()
                .goto(url)
                .Amazon()
                .end()
                .then(Amazon => {

                    if(Amazon.pString.includes("-")){
                        Amazon.pString = Amazon.pString.split("-")[0];
                    }

                    const priceNumber =  Number(Amazon.pString.replace(/[^0-9.-]+/g, "" ));
                
                    productName   =  Amazon.name;
                    productPrice  =  priceNumber;
                    productimgURL =  Amazon.image;

                    return {
                        productName,
                        productPrice,
                        productimgURL,
                    }

                })
            
                return x;
        }
        else if(website == "www.snapdeal.com"){
            const x = await Nightmare()
            .goto(url)
            .Snapdeal()
            .end()
            .then(Snapdeal => {
              
               
                const priceNumber =  Number(Snapdeal.pString.replace(/[^0-9.-]+/g, "" ));
                
             
               
                productName   =  Snapdeal.name;
                productPrice  =  priceNumber;
                productimgURL =  Snapdeal.image;

                return {
                    productName,
                    productPrice,
                    productimgURL,
                }

                
            })

            return x;
        }
        else if(website == "www.flipkart.com"){
           
            const x = await Nightmare()
            .goto(url)
            .Flipkart()
            .end()
            .then(Flipkart => {
              
                const priceNumber =  Number(Flipkart.pString.replace(/[^0-9.-]+/g, "" ));
                var final_image;
                if(Flipkart.image1 === null)
                    final_image = Flipkart.image2;
                else
                    final_image = Flipkart.image1;
                
                productName   =  Flipkart.name;
                productPrice  =  priceNumber;
                productimgURL =  final_image;

                return {
                    productName,
                    productPrice,
                    productimgURL,
                }
            })

            return x;
        }
        else if(website == "www.ebay.com"){
           
            const x = await Nightmare()
            .goto(url)
            .EBay()
            .end()
            .then(EBay => {
    
                const priceNumber =  Number(EBay.pString.replace(/[^0-9.-]+/g, "" ));
               
                productName   =  EBay.name;
                productPrice  =  priceNumber;
                productimgURL =  EBay.image;

                return {
                    productName,
                    productPrice,
                    productimgURL,
                }
            })

            return x;
        }
        else if(website == "paytmmall.com"){
            const x = await Nightmare()
            .goto(url)
            .Paytmmall()
            .end()
            .then(Paytmmall => {
    
                const priceNumber =  Number(Paytmmall.pString.replace(/[^0-9.-]+/g, "" ));
               
                
                productName   =  Paytmmall.name;
                productPrice  =  priceNumber;
                productimgURL = Paytmmall.image;

                return {
                    productName,
                    productPrice,
                    productimgURL,
                }
            })

            return x;
        }
     
    } 
    catch (e) {
        console.log("error :",  e);
    }

}

module.exports = fetchDetails;