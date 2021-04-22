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
                // console.log(res.data)
               
                this.setState({
                    user : res.data,
                    reload: true
                })
               
            })
            .catch(err => console.log("failed to fetch products"));
            
        })();  
    }




    render() {
        return this.state.reload? (
            <div className="auth-wrapper">
            <div className="auth-inner" style={{backgroundColor:'white',fontSize:'x-large'}}>
                <h1 style={{padding: '3px',fontSize:'xx-large'}}>Profile</h1>
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
