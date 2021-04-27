import axios from 'axios';
import {BACKEND} from '../config';
import React, {Component} from 'react';
import CartNavbar from './CartNavbar';
import {Alert} from 'react-bootstrap';

class AddProduct extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            productTitle : "",
            productURL : "",
            thresholdPrice : "",
            msg : "",
            variant : "",
        }
    }
    
    onChangeProductURL =(e)=>{
        this.setState({
            productURL : e.target.value
        });
    }

    onChangeProductTitle =(e)=>{
        this.setState({
            productTitle : e.target.value
        });
    }

    onChangethresholdPrice = (e) => {
        
        this.setState({
            thresholdPrice : e.target.value,
        });
    }

    onSubmit = async (e) =>{
        e.preventDefault();
        const new_product = {
            productURL : this.state.productURL,
            thresholdPrice : this.state.thresholdPrice,
            email : localStorage.getItem('email'),
            name : localStorage.getItem('name'),
            title : this.state.productTitle,
        }

        const res_data = await axios
        .post(BACKEND + '/products/addproduct', new_product)
		.then(res => res.data)
        .catch(err => console.log(err));

        if(res_data && res_data.success === true){
        
            this.props.history.push(`/home`);

        }
        else{
            if(res_data) {
                this.setState({
                    msg : res_data.msg,
                    variant : "danger",
                })
            }
            else {
                this.setState({
                    msg : "Enter Valid link",
                    variant : "danger",
                })
            }
           
        }

        
    }

    onClose = (e) =>{
        this.setState({
            msg : "",
            variant : "",
        });
    }

    render(){
        return(
            <div className="container">
                <CartNavbar/>
                <div style={{width: '80%', margin : '10px auto'}}>
                      
                    <form onSubmit={this.onSubmit}>
                        { this.state.msg? <Alert style={{width : '50%'}} variant={this.state.variant}o onClose={this.onClose} dismissible>
                                                <p>{this.state.msg.toUpperCase()}</p>
                                            </Alert> : "" }
                        {/* <h2 style={{color : 'red'}}><u>Add Product</u></h2><br/> */}
                        <div className={"form-group"}>
                            
                            <label style={{fontSize : '20px', color: 'white'}} htmlFor="productTitle">Product Title</label><br />
                            <input style={{ width: '90%', height : '40px'}}
                                id="productTitle" 
                                type="text"
                                name="productTitle" 
                                placeholder="Enter Title" 
                                value={this.state.productTitle} 
                                onChange={this.onChangeProductTitle}
                                required
                            />
                            <br/>
                            <Alert style={{width : '90%'}} variant="danger">
                                <span><i className="info circle large icon"></i>product Title is used for Recommending products, please enter valid and legitimate data to get accurate recommendation results
                                </span>
                            </Alert>
                        </div>
                        
                        <div className={"form-group"}>
                            <label style={{fontSize : '20px', color: 'white'}} htmlFor="producturl">Product URL</label>
                            <input style={{ width: '90%', height : '40px'}}
                                id="producturl" 
                                type="text"
                                name="productURL" 
                                placeholder="Enter URL" 
                                value={this.state.productURL} 
                                onChange={this.onChangeProductURL}
                                required
                            />
                        </div>
                        <div  className={"form-group"}>
                            <label style={{fontSize: '20px', color: 'white'}}  htmlFor="price">Price</label>
                            <input style={{ width: '90%', height : '40px'}} 
                                id="price" 
                                type="number" 
                                name="thresholdPrice"
                                placeholder="Enter product price" 
                                value={this.state.thresholdPrice} 
                                onChange={this.onChangethresholdPrice}
                                required
                            />
                        </div><br/>
                        <button type="submit" style={{width: '95%', margin:"2px auto 6px"}} className={'btn btn-primary btn-block'}>Add Product</button>
                    </form>
               
                </div>
                
            </div>
        )
    }
}

export default AddProduct;