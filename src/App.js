import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Component/Login";
import SignUp from "./Component/Signup";
import Home from "./Component/Home";
import AddProduct from './Component/AddProduct';

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/signin"}>Price Tracer</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/signin"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route exact path="/products/addproduct" component={AddProduct}/>
      </Switch>

    </div></Router>
  );
}

export default App;