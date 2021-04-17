import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";
import { BACKEND } from "../config";
import { Link} from "react-router-dom";
import { Button } from "reactstrap";
import './Landing.css';
import ErrorMsg from "./ErrorMsg";


function Login () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginResponse = await axios.post(BACKEND + "/users/login", loginUser);
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            localStorage.setItem("name", loginResponse.data.user.name);
            localStorage.setItem("email", loginResponse.data.user.email);
            localStorage.setItem("id", loginResponse.data.user.id);
            history.push("/home");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={submit}>
                    <h3>Sign In</h3>    
                    {error && <ErrorMsg message={error} clearError={() => setError(undefined)} />}

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" 
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="forgot-password text-right">
                        <Link to="/">
                            <Button color="link">
                            <span>Forgot Password?</span>
                            </Button>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
        
    );
}
 
export default Login;