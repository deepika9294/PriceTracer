import React, { Component } from "react";
import { Link} from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios";
import { BACKEND } from "../config";




export default class SignUp extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        contactNo: "",

    };

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            contactNo: this.state.contactNo
        }
        axios
            .post(BACKEND + "/users/adduser", user)
            .then((res) => {
                alert("User added");
            })
            .catch(err => console.log(err));
        //direct to homepage
    }
        

    render() {
        return (
            <form onSubmit={this.onSubmit} >
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Full Name" name="name" 
                    value={this.state.name}
                    onChange={this.changeHandler}
                    required
                    />
                </div>

                <div className="form-group">
                    <label>Mobile Number</label>
                    <input type="text" className="form-control" placeholder="Mobile Number" name="contactNo"
                    value={this.state.contactNo}
                    onChange={this.changeHandler}
                    required

                    />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                    required

                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="text" className="form-control" placeholder="Enter password" name="password"
                    value={this.state.password}
                    onChange={this.changeHandler}
                    required


                    />
                </div>

                <button type="submit" value="Submit" className="btn btn-primary btn-block">Sign Up</button>
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