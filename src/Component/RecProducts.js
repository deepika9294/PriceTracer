import React, { Component } from 'react';
import CartNavbar from './CartNavbar';
import axios from 'axios';
import {BACKEND} from '../config';
import RecProductCard from './RecProductCard';


export class RecProducts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            products : [],
        }
    }
    
    componentDidMount(){
        
        var product_id = (window.location.search);
        product_id = product_id.split('=')[1];

        const user = {
            user_id : localStorage.getItem('id'),
            product_id : product_id,
        }

        console.log('user', user);

        axios
        .post( BACKEND + '/products/getRecommendation', user)
        .then(res => {
            const product_list = (res.data.value).map( (product , index) =>{
                console.log(product);
                return (<RecProductCard product={product} key={index}></RecProductCard>)
            })      
            this.setState({
                products : product_list
            })
        })
        .catch(err => console.log("failed to fetch products"));
    }

    render() {

        if(this.state.products.length === 0){
            return(
                <div> 
                    <h1>LOADING</h1>
                </div>
            )
        }

        if(this.state.products && this.state.length !== 0){
            return (
                    <div className ="container">
                        <CartNavbar/>
                        {this.state.products}
                    </div>
            )
        }
        else{
            return (
                <div className ="container">
                    <CartNavbar/>
                    <h1>No recommendation available </h1>
                </div>
            )

        }
    }
}

export default RecProducts;
