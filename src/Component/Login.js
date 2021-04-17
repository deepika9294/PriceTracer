import React, { Component } from "react";
import { Link, Redirect} from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios";
import { BACKEND } from "../config";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            nameError: "",
            passwordError: "",
            loginError: false,
            isLoggedIn: false,
            errorMessage: false
        }
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        const status = await axios
        .post(BACKEND + '/users/login', user)
		.then(res => res.status)
        .catch(err => console.log(err));

        if(status !== 200) {
            this.setState({
                isLoggedIn: false,
                errorMessage: true
            })
        }
        else {
            this.setState({
                isLoggedIn: true,
                errorMessage: false
            })
        }

       
    }
    

    render() {
        if( this.state.isLoggedIn) {
             return <Redirect to="/home"/>;
        }
        const error = this.state.errorMessage;
        if(error) {
            return(<h2>Wrong credentials</h2>)  //may display an error page
        }

        return (
            <form onSubmit={this.onSubmit}>
                <h3>Sign In</h3>    

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                    name="email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                    required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" 
                    name="password"
                    value={this.state.password}
                    onChange={this.changeHandler}

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
        );
    }
}