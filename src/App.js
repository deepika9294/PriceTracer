import React, {useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Component/Login";
import SignUp from "./Component/Signup";
import Home from "./Component/Home";
import AddProduct from './Component/AddProduct';
import UserContext from './context/userContext';
import { BACKEND } from "./config";
import axios from "axios";
import Check from "./Component/Check";
import Header from "./Component/Header";

function App() {

  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(BACKEND + '/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
      if (tokenResponse.data) {
        const userRes = await axios.get(BACKEND + "/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }
    checkLoggedIn();
  }, []);

  return (<Router>
    <UserContext.Provider value={{ userData, setUserData }}>

    <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/check" component={Check} />

        <Route path="/home" component={Home} />
        <Route exact path="/products/addproduct" component={AddProduct}/>
      </Switch>

    </div>
    </UserContext.Provider>
    
    </Router>
  );
}

export default App;