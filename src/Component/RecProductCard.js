import React, { Component } from 'react'

class RecProductCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mt-3">
                        <div className="card rec">
                            <div className="card-horizontal">
                               
                                <div className="card-body">
                                    
                                    <h4 className="card-title">{this.props.product.website}</h4>
                                    {this.props.product.urls.length === 0 ? <span>No Results Found</span> : ""}
                                    {this.props.product.urls.map((mydata,index )=> {
                                        return (
                                            <div key={index}>
                                                <div className="img-square-wrapper">
                                                    <img className="" style = {{width : '300px', height: '300px'}}src={mydata.image} alt="product"/>
                                                </div>
                                                <span className="card-text">Product Name  - {mydata.name} </span><br/>
                                                <span className="card-text">Product Price - {this.props.product.website === "www.amazon.com" || this.props.product.website === "www.ebay.com"? "$" : "₹"}
                                                    {mydata.price} 
                                                </span><br/>
                                                <span className="card-text">Product URL - <a href={mydata.url}>Know More</a></span>
                                                <hr/>
                                            </div>
                                            
                                        );
                                        
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default RecProductCard;
