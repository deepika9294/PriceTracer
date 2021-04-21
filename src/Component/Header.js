import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
// import AuthOptions from './AuthOptions';
import { Icon } from "semantic-ui-react";
import { SiShopify } from "react-icons/si";
import { useHistory } from 'react-router-dom';
import UserContext from "../context/userContext";
import './Landing.css';
import { Button } from "reactstrap";

class Header extends Component {
   
    render() { 
        return ( 
            <div>
                <Link to="/"><h1>Price Tracer</h1></Link>
                <AuthOptions />
            </div>
         )
    }
  }
 
export default Header;