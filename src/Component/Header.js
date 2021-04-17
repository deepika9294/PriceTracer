import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from './AuthOptions';

class Header extends Component {
   
    render() { 
        return ( 
            <div>
                <Link to="/"><h1 style={{color: "black"}}>Price Tracer</h1></Link>
                <AuthOptions />
            </div>
         );
    }
}
 
export default Header;