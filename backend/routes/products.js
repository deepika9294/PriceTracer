const validURL = require('valid-url');

const router = require('express').Router();
let User = require('../models/user');
const Product = require('../models/product');

const fetchProductDetails = require('../utils/fetchProductDetails');
const priceTracking = require('../utils/priceTracking');
const fetchWebsite = require('../utils/fetchWebsite');


router.route('/addproduct').post( async(req, res) => {
    
    const productURL = req.body.productURL;
    const thresholdPrice = req.body.thresholdPrice;
    const email = req.body.email;
    const name = req.body.name;

    //validate the url
    if(!validURL.isUri(productURL)){
        return res.json({success: false, msg : "invlaid url"});
    }
    
    //fetch the host name
    const website = fetchWebsite(productURL);

    //fetch basic product details
    const productDetails = await fetchProductDetails(productURL);
    

    const { productName, productPrice, productimgURL } = productDetails;
 
    // need to modify it later with populate
    await User.findOne({email : email}).then(user => {

        if(!user){
            res.sendStatus(204);
        }
        else{

            const newProduct = new Product();
            newProduct.productName = productName;
            newProduct.productImage = productimgURL;
            newProduct.productURL = productURL;
            newProduct.productWebsite = website;
            newProduct.thresholdPrice = thresholdPrice;
            newProduct.owner =  user._id;
    
            newProduct.save()
                .then(() => {
                    res.json({success : true , msg: "product added successfully"});
                    console.log("added new product in product database");
                    user.Cart.push(newProduct._id);
                    user.save()
                        .then(()=>{
                            console.log("pushed product to user cart successfully");
                        })
                        .catch(err =>{
                            console.log("couldnot update the cart");
                        });
            
                    priceTracking(productURL, thresholdPrice, productName, newProduct._id);
                })
                .catch(err => {
                    res.status(400).json('Error: ' + err);
                    console.log("couldnot save product in produt database");
                });     
        }
    });
});

// once the user is populated this will also change
// this is done temporarily
router.route('/getproducts').post( async(req, res)=>{
    const email = req.body.email;
    
    User.findOne({email}).then(user =>{
        if(user){
            const products = user.Cart;
            
            if(products.length == 0){
                return res.json({success: true, value: []});
            }

            var list = [];
            products.map(product_id =>{
                
                Product.findOne({_id: product_id}).then(product =>{
                    if(product){
                        
                        const data = {
                            productName : product.productName,
                            productImage : product.productImage,
                            productURL : product.productURL,
                            productWebsite : product.productWebsite,
                            thresholdPrice : product.thresholdPrice,
                        }

                        list.push(data);

                        if(list.length == products.length){
                            return res.json({success: true, value : list});
                        }
                    }
                })
                
            })

           
                
        }
        else{
            return res.json({success: false, value : "invalid user"});
        }

    })
});


module.exports = router;