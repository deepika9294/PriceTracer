import axios from 'axios';
import {BACKEND} from '../config';

import React, {Component} from 'react';
import CartNavbar from './CartNavbar';
import {Alert} from 'react-bootstrap';

class AddProduct extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
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
            email : 'akanksha@gmail.com',
            name : 'shah',
        }

        const res_data = await axios
        .post(BACKEND + '/products/addproduct', new_product)
		.then(res => res.data)
        .catch(err => console.log(err));

        console.log(res_data);
        if(res_data.success === true){
            this.setState({
                msg : res_data.msg,
                variant : "success",
            })

            this.props.history.push(`/home`);

        }
        else{
            this.setState({
                msg : res_data.msg,
                variant : "danger",
            })
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
                <div style={{width: '100%'}}>
                      
                    <form style={{marginTop: '50px'}} onSubmit={this.onSubmit}>
                        { this.state.msg.toString()? <Alert style={{width : '50%'}} variant={this.state.variant}o onClose={this.onClose} dismissible>
                                                <p>{this.state.msg.toUpperCase()}</p>
                                            </Alert> : "" }
                        <h2>Add Product</h2><br/>
                        <div className={"form-group"}>
                            <label style={{fontSize : '20px'}} htmlFor="producturl">Product URL</label><br />
                            <input style={{width : '50%', height : '40px'}}
                                id="producturl" 
                                type="text"
                                name="productURL" 
                                placeholder="Enter URL" 
                                value={this.state.productURL} 
                                onChange={this.onChangeProductURL}
                                required
                            />
                            <br/>
                        </div>
                        <div  className={"form-group"}>
                            <label style={{fontSize : '20px'}}  htmlFor="price">Price</label><br />
                            <input style={{width : '50%' , height : '40px'}} 
                                id="price" 
                                type="number" 
                                name="thresholdPrice"
                                placeholder="Enter product price" 
                                value={this.state.threadholdPrice} 
                                onChange={this.onChangethresholdPrice}
                                required
                            />
                        </div><br/>
                        <button type="submit" style={{width : '50%'}}className={'btn btn-primary btn-lg'}>Add Product</button>
                    </form>
               
                </div>
                
            </div>
        )
    }
}

export default AddProduct;