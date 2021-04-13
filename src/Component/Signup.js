import React, { Component } from "react";
import { Link} from "react-router-dom";
import { Button } from "reactstrap";

export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Full Name" />
                </div>

                <div className="form-group">
                    <label>Mobile Number</label>
                    <input type="text" className="form-control" placeholder="Mobile Number" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered   
                    <Link to="/signin">
                        <Button color="link">
                        <span>sign in?</span>
                        </Button>
                    </Link>


                </p>
            </form>
        );
    }
}