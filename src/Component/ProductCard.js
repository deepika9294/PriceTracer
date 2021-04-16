import React from 'react'
import './ProductCard.css'

function ProductCard({product}) {
    return (
        
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 mt-3">
                    <div class="card">
                        <div class="card-horizontal">
                            <div class="img-square-wrapper">
                                <img class="" src={product.productImage} alt="product"/>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title">{product.productName}</h4>
                                <p class="card-text">Threshold Price - {product.thresholdPrice}</p>
                                <p class="card-text">Product Website - {product.productWebsite}</p>
                                <p class="card-text">Product URL     - <a href={product.productURL}>click URL</a></p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <small class="card-muted-text">Last updated 5 min ago</small>
                            <button class="btn btn-outline-danger btn-md float-right">Delete</button>
                            <button class="btn btn-outline-success btn-md float-right">Get Price Trends</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
