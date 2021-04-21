const Nightmare = require('nightmare')
const nightmare = Nightmare({show:true})

const fetchDetails = async (website, url) => {
    
    try {

        //sorted
        Nightmare.action('EBay', function(done) {
            this.evaluate_now(() => {
                try{
                   
                    const priceString = document.querySelector("#prcIsum").innerText || "000zero";
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
                    
                    const priceString = document.getElementsByClassName("_30jeq3 _16Jk6d").innerText || "000zero";
                    const pname = document.querySelector(".B_NuCI").innerText|| "Name";
                    const classes = ['._396cs4._2amPTt._3qGmMb._3exPp9', '._2r_T1I._396QI4'];
                    for(var i=0; i < classes.length; i++){
                        const image = document.querySelector(classes[i]).src;
                        if(image != null && image != undefined){
                            return {
                                pString : priceString,
                                name : pname,
                                image : image,
                            }
                        }    
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
            const priceString =(document.getElementById("priceblock_dealprice")|| document.getElementById("atfRedesign_priceblock_priceToPay") || document.getElementById("priceblock_ourprice")).innerText || document.getElementsByClassName('a-price-whole').innerText;
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