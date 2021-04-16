import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';



class CartNavbar extends Component{
    render(){
        return(
            <div style={{width : '100%'}}>
                <Navbar bg="dark" variant="dark" style={{marginTop: '200px'}}>
                    <Navbar.Brand style={{fontSize: '20px'}} href="/home">My Cart</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link style={{fontSize: '20px'}} href="/products/addproduct">Add Products</Nav.Link>
                    </Nav>  
                </Navbar> 
            </div>
        )
    }
}

export default CartNavbar;