const Nightmare = require('nightmare');
const nightmare = Nightmare({show:true});

const fetchURL = async (url, website) =>{
    try{
        Nightmare.action('EBay', function(done) {
            this.evaluate_now(() => {
                try{
                    
                    var urls = document.querySelectorAll('.s-item__link');
                    const links = [];
                    urls.forEach((url) =>{
                        links.push(url.href);
                    })

                    return {
                        urls : links.splice(0,2),
                    }
                }catch(e){
                    throw e
                }        
            }, done)
        })

        Nightmare.action('Paytmmall', function(done) {
            this.evaluate_now(() => {
                try{
                    
                    const urls = document.querySelectorAll('a._8vVO');
                    const links = [];
                    urls.forEach((url) =>{
                        links.push(url.href);
                    })

                    return {
                        urls : links.splice(0, 2),
                    }
                }catch(e){
                    console.log("error : ", e);
                }    
                
            }, done)
        })

        Nightmare.action('Amazon', function(done) {
            this.evaluate_now(() => {
                try{
                    
                    const urls = document.querySelectorAll('a.a-link-normal.s-no-outline');
                    if(urls){
                        const links = [];
                        urls.forEach((url) =>{
                            links.push(url.href);
                        })

                        return {
                            urls : links.splice(0,2),
                        }
                    }

                    var urls1 = document.querySelectorAll('a.a-link-normal.a-text-norma');
                    const links = [];
                    urls1.forEach((url) =>{
                        links.push(url.href);
                    })

                    return {
                        urls : links.splice(0,2),
                    }
                
                }catch(e){
                    console.log("error : ", e);
                }    
                
            }, done)
        })
       
        Nightmare.action('Flipkart', function(done) {
            this.evaluate_now(() => {
                try{
                    const classes = ['a.a.s1Q9rs', 'a._1fQZEK', 'a._2UzuFa', 'a._2rpwqI'];
                    for(var i =0; i <classes.length; i++){
                        var urls = document.querySelectorAll(classes[i]);
                        if(urls.length != 0){
                            const links = [];
                            urls.forEach((url) =>{
                                links.push(url.href);
                            })

                            return {
                                urls : links.splice(0,2),
                            }
                        }
                    }

                }catch(e){
                    console.log("error : ", e);
                }    
                
            }, done)
        })

        Nightmare.action('Snapdeal', function(done) {
            this.evaluate_now(() => {
                try{
                    
                    var urls = document.querySelectorAll('a.dp-widget-link.noUdLine.hashAdded');
                    const links = [];
                    urls.forEach((url) =>{
                        links.push(url.href);
                    })

                    return {
                        urls : links.splice(0,2),
                    }
                }catch(e){
                    console.log("error : ", e);
                }        
            }, done)
        })

        if(website == "paytmmall.com"){
                const x = await Nightmare()
                .goto(url)
                .Paytmmall()
                .end()
                .then( Paytmmall => {
                   return Paytmmall.urls;
                    
                })

                return x;
        }
        else if(website == "www.amazon.com" || website == "www.amazon.in"){
            const x = await Nightmare()
            .goto(url)
            .Amazon()
            .end()
            .then(Amazon => {
                return Amazon.urls;
                
            })

            return x;
        }
        else if(website == "www.flipkart.com"){
            const x = await Nightmare()
            .goto(url)
            .Flipkart()
            .end()
            .then( Flipkart => {
               return Flipkart.urls;
                
            })

            return x;
        }
        else if(website == "www.snapdeal.com"){
            const x = Nightmare()
            .goto(url)
            .Snapdeal()
            .end()
            .then( Snapdeal => {
                return Snapdeal.urls;
            })

            return x;
        }
        else if(website == "www.ebay.com"){
            const x = Nightmare()
            .goto(url)
            .EBay()
            .end()
            .then( EBay => {
                return EBay.urls;
            })

            return x; 
        }
    }
    catch(e){
        console.log("error: ", e);
    }
}

module.exports = fetchURL;