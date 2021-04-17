import axios from "axios";
import React, {Component} from "react";
import {BACKEND} from '../config';
import CartNavbar from './CartNavbar';
import ProductCard from './ProductCard';

class Home extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            products : [],
        }
    }
    
    componentDidMount(){
        (async () =>{
            // this should be fetched from localstorage after the jwt token setup
            const user = {
                email : 'shahakanksha286@gmail.com',
                name : 'akanksha',
            };

            await axios
            .post( BACKEND + '/products/getproducts', user)
            .then(res => {
                const product_list = (res.data.value).map( (product) =>{
                    return (<ProductCard product={product}></ProductCard>)
                })      
                this.setState({
                    products : product_list
                })
            })
            .catch(err => console.log("failed to fetch products"));
            
           
            
        })();  
    }

    render(){

        if(this.state.products && this.state.length !== 0){
            return (
                <div className="container">
                    <CartNavbar/>
                    {this.state.products} 
                </div>
            )
        }
        else{
            return (
                <div className="container">
                    <CartNavbar/>
                </div>
            )
        }
    }
   
}

export default Home;

