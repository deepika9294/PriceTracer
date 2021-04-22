
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link} from "react-router-dom";
import { Button } from "reactstrap";
import { BACKEND } from "../config";
import ErrorMsg from "./ErrorMsg";

function Signup () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [contactNo, setContactNo] = useState();
    const [error, setError] = useState();
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const check = await validateEmail(email);
            console.log("check:" + check)
            if(!check) {
                alert("Already Registered");
                history.push("/");
                return;
            }
            const newUser = {email, password, name, contactNo};
            await axios.post(BACKEND + "/users/adduser", newUser);
            alert("Please Check your mail for verification");
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };

    const validateEmail = async (email) => {
        const user = {
            email 
        }
        const result = await axios.post(BACKEND + "/users/checkuser", user )
                    .then((res) => {
                        console.log(res.data)
                        if (res.data) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    })
                    .catch((err)=> {
                        console.log("Error in validating user")
                        return false;
                    })
                    console.log(result);
        return result;
    }
   
    return (
        
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={submit} >
                    <h3>Sign Up</h3>
                    {error && <ErrorMsg message={error} clearError={() => setError(undefined)} />}

                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Full Name" name="name" 
                        required
                        onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="text" className="form-control" placeholder="Mobile Number" 
                        name="contactNo"
                        maxLength="10"
                        minLength="10"
                        required
                        onChange={e => setContactNo(e.target.value)}

                        />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" name="email"
                        required
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" className="form-control" placeholder="Enter password" name="password"
                        required
                        onChange={e => setPassword(e.target.value)}

                        />
                    </div>

                    <button type="submit" value="Submit" className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered   
                        <Link to="/signin">
                            <Button>
                            <span>Sign in?</span>
                            </Button>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
        
    );
}
 
export default Signup;