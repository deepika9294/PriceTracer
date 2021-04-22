import axios from "axios";
import React, {Component} from "react";
import {BACKEND} from '../config';
import CartNavbar from './CartNavbar';
import ProductCard from './ProductCard';
// import {Redirect} from 'react-router-dom';

class Home extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            products : [],
            reload : false,
        }
    }
    
    onDeleteHandle = (dataFromChild) =>{
        this.setState({
            reload: dataFromChild,
        })
        window.location.reload();
        //this.componentDidMount();
    }

    onRecommendHandle = (dataFromChild) =>{
        
        this.props.history.push(`/products/getRecommendation?product_id=${dataFromChild}`); 
    }

    componentDidMount(){
        (async () =>{
            
            const user = {
                email : localStorage.getItem('email'),
                name : localStorage.getItem('name'),
            };

            console.log(user);

            await axios
            .post( BACKEND + '/products/getproducts', user)
            .then(res => {
                const product_list = (res.data.value).map( (product , index) =>{
                    return (<ProductCard product={product} onRecommendHandle={this.onRecommendHandle} onDeleteHandle = {this.onDeleteHandle} key={index}></ProductCard>)
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

