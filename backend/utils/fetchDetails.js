const Nightmare = require('nightmare')
const nightmare = Nightmare({show:true})

const fetchDetails = async (website, url) => {
    
    try {
        Nightmare.action('Flipkart', function(done) {
            this.evaluate_now(() => {
                try{

                    const priceString = document.querySelector("._30jeq3._16Jk6d").innerText || "000zero";
                    const pname = document.querySelector(".B_NuCI").innerText|| "Name";
                    const image = document.querySelector("._396cs4._2amPTt._3qGmMb._3exPp9").src;
                   
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


        Nightmare.action('Amazon', function(done) {
            this.evaluate_now(() => {
            const priceString =(document.getElementById("priceblock_dealprice")|| document.getElementById("atfRedesign_priceblock_priceToPay") || document.getElementById("priceblock_ourprice")).innerText || 0
            const pname = document.getElementById("productTitle").innerText;
            const image = document.getElementById("landingImage").src;
            return {
                pString : priceString,
                name : pname,
                image : image
            }
            }, done)
        })


        if (website == "www.amazon.com" || website == "www.amazon.in"){
            const x = await Nightmare()
                .goto(url)
                .Amazon()
                .end()
                .then(Amazon => {
                    console.log(Amazon.pString, Amazon.name, Amazon.image);
                    const priceNumber =  Number(Amazon.pString.replace(/[^0-9.-]+/g, "" ));
                    console.log(priceNumber);

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
               
                
                productName   =  Flipkart.name;
                productPrice  =  priceNumber;
                productimgURL =  Flipkart.image;

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