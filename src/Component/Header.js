import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
// import AuthOptions from './AuthOptions';
import { Icon } from "semantic-ui-react";
import { SiShopify } from "react-icons/si";
import { useHistory } from 'react-router-dom';
import UserContext from "../context/userContext";
import './Landing.css';
import { Button } from "reactstrap";



function Header() {
    const history = useHistory();
    const { isUserValid, setIsUserValid } = useContext(UserContext);
    const userName = localStorage.getItem("name").split(" ");
    const logout = () => {
        setIsUserValid(false);
        localStorage.removeItem("auth-token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        history.push("/");

    };
    
    const loginRegLink = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/signin" className="nav-link text-white" >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link text-white">
              Register
            </Link>
          </li>
        </ul>
      );
  
      const userLink = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/home" className="nav-link text-white">
                Cart
              {/* {userName[0]} */}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link text-white">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link text-white">
              {userName[0]}
            </Link>
          </li>
          <li className="nav-item">
             <Button color="link" className="nav-link text-white" onClick={logout}>Logout</Button>
            
          </li>
        </ul>
      );
  

    
    // render() { 
        // return ( 
        //     <div>
        //         <Link to="/"><h1 style={{color: "black"}}>Price Tracer</h1></Link>
        //         <AuthOptions />
        //     </div>
        //  );

         return (
            <nav className="navbar navbar-expand-sm navbar-light color-nav rounded">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample10"
              aria-controls="navbarsExample10"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarsExample10">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link text-white">
                    <h4>
                    <SiShopify  color="yellow" />
                        Price Tracer  
                    </h4>
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className="collapse navbar-collapse justify-content-md-end"
              id="navbarsExample10"
            >
              {isUserValid ? userLink : loginRegLink}
            </div>
          </nav>
         )
    }
// }
 
export default Header;