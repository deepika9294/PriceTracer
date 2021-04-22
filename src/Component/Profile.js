import React, { Component } from 'react'
import axios from "axios";
import {BACKEND} from '../config';


export default class Profile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            user : {},
            reload : false,
        }
    }
    


    componentDidMount(){
        (async () =>{
            const id = localStorage.getItem('id');
           await axios
            .get( `${BACKEND}/users/getuser/${id}`)
            .then(res => {
                console.log(res.data)
               
                this.setState({
                    user : res.data,
                    reload: true
                })
                // console.log("user" )
                // console.log(this.state.user);
            })
            .catch(err => console.log("failed to fetch products"));
            
        })();  
    }




    render() {
        return this.state.reload? (
            <div className="auth-wrapper">
            <div className="auth-inner">
                <h2>Profile</h2>
                <p>Name: {this.state.user.name} </p>
                <p>Email: {this.state.user.email}</p>
                <p>Mobile No: {this.state.user.contactNo}</p>
                <p>Mode: {this.state.user.mode}</p>
                <p>Products Count:{this.state.user.Cart.length}</p>

                </div>

            </div>
        ): (<div>
            Loading
        </div>)
    }
}
