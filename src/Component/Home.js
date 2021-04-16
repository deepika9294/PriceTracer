import axios from "axios";
import React, {Component} from "react";
import {BACKEND} from '../config';
import CartNavbar from './CartNavbar';
import ProductCard from './ProductCard';

class Home extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
            products : [{}],
        }
    }
    
    componentDidMount(){
        var res_data_list;
        
        (async () =>{
            console.log("in useffect");
            // this should be fetched from localstorage after the jwt token setup
            const user = {
                email : 'akanksha@gmail.com',
                name : 'akanksha',
            };

            res_data_list = await axios
            .post( BACKEND + '/products/getproducts', user)
            .then(res => res.data.value)
            .catch(err => console.log("failed to fetch products"));
            
            console.log(res_data_list);
            
            console.log("akanksha");
            console.log(this.state.products);

            this.setState({
                products : res_data_list,
            })
            
        })();  
    }

    render(){
        return (
            <div className="container">
                    <CartNavbar/>
                    <div>
                        {this.state.products.map(product => {
                            return <ProductCard product={product}/>
                        })}
                    </div>
            </div>
        )
    }
   
}

export default Home;

