import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link} from "react-router-dom";
import { Button } from "reactstrap";




class CartNavbar extends Component{
    render(){
        return(
            <div >
                <Navbar className="mynav">
                    {/* <Navbar.Brand style={{fontSize: '20px', color : 'red'}} href="/home">My Cart</Navbar.Brand> */}
                    <Link id="btn-linkl"  to="/home">
                            {/* <Button color="link"> */}
                            <span>My Cart</span>
                            {/* </Button> */}
                        </Link>
                    {/* <Nav className="ml-auto"> */}
                        <Link id="btn-linkl"  to="/products/addproduct">
                                {/* <Button   color="link"> */}
                                <span>Add Product</span>
                                {/* </Button> */}
                         </Link>
                        {/* <Nav.Link style={{fontSize: '20px', color : 'red'}} href="/products/addproduct">Add Products</Nav.Link> */}
                    {/* </Nav>   */}
                </Navbar> 
            </div>
        )
    }
}

export default CartNavbar;