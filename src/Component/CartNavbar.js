import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link} from "react-router-dom";
import { Button } from "reactstrap";




class CartNavbar extends Component{
    render(){
        return(
            <div style={{width : '100%'}}>
                <Navbar bg="dark" variant="dark" style={{marginTop: '100px'}}>
                    {/* <Navbar.Brand style={{fontSize: '20px', color : 'red'}} href="/home">My Cart</Navbar.Brand> */}
                    <Link to="/home">
                            <Button color="link">
                            <span>My Cart</span>
                            </Button>
                        </Link>
                    <Nav className="ml-auto">
                        <Link to="/products/addproduct">
                                <Button color="link">
                                <span>Add Product</span>
                                </Button>
                         </Link>
                        {/* <Nav.Link style={{fontSize: '20px', color : 'red'}} href="/products/addproduct">Add Products</Nav.Link> */}
                    </Nav>  
                </Navbar> 
            </div>
        )
    }
}

export default CartNavbar;