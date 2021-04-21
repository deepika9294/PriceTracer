const Nightmare = require('nightmare')
const nightmare = Nightmare({show:true})
const args = process.argv.slice(2);const site = args[0].toString().trim() ;const url = args[1]
// const url ="https://www.amazon.in/Milton-Thermosteel-Flip-Lid-Flask/dp/B08TNRY8LH/"||"https://www.amazon.in/gp/product/B08696W3B3"
// const url = "https://www.amazon.in/Floral-Print-Round-Neck-SP21ELITE06_YELLOW__L/dp/B08S1D49YT/"
const threshold = 10000

checkPrice()

async function checkPrice() {
    try {
        
        Nightmare.action('Myntra', function(done) {
            this.evaluate_now(() => {
                try{
                    const priceString =document.getElementsByClassName(".pdp-price").innerText || "000zero"// document.getElementsByClassName("product-info-container").innerText || 0
                    const pname = document.getElementsByClassName(".pdp-name").innerText|| document.getElementsByClassName(".product-detail").innerText || "NAme"
                    
                    return {
                        pString : priceString,
                        name : pname
                    }
                }catch(e){
                    throw e
                }    
                
            }, done)
        })
        Nightmare.action('Amazon', function(done) {
            this.evaluate_now(() => {
            const priceString =   (document.getElementById("priceblock_dealprice")|| document.getElementById("atfRedesign_priceblock_priceToPay") || document.getElementById("priceblock_ourprice")).innerText || 0
            return {
                pString : priceString
            }
            }, done)
        })

        if (site == "amazon"){
            Nightmare()
                .goto(url)
                .Amazon()
                .end()
                .then(Amazon => {
                    console.log(Amazon.pString)
                    const priceNumber =  Number(Amazon.pString.replace(/[^0-9.-]+/g, "" ));
                    console.log(priceNumber)
                    if (priceNumber < threshold) {
                        console.log(
                        `hurrayy..price on AMAZON PRODUCT ${url} has dropped below ${threshold}`
                    )
                    }else{
                        console.log("Wait for some time!!\n")
                    }
                })
            }else if(site == "myntra"){
                Nightmare()
                .goto(url)
                .Myntra()
                .end()
                .then(Myntra => {
                    console.log(Myntra.pString , Myntra.name)
                    const priceNumber =  Number(Myntra.pString.replace(/[^0-9.-]+/g, "" ));
                    console.log(priceNumber)
                    if (priceNumber < threshold) {
                        console.log(
                        `hurrayy..price on MYNTRAA PRODUCT ${url} has dropped below ${threshold}`
                    )
                    }else{
                        console.log("Wait for some time!!\n")
                    }
                })
            }        
    } catch (e) {
        await console.log('Price Checker Error')
        throw e
    }

        }
