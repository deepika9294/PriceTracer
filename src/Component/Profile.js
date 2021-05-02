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
            
            <div className ="card container">
            <div className="card-horizontal">
            <div className="card-body">
                <h2  className="card-title">PROFILE</h2>
                <hr/>
                <h3 className="card-text">Name: {this.state.user.name} </h3><br/>
                <h3 className="card-text">Email: {this.state.user.email}</h3><br/>
                <h3 className="card-text">Mobile No: {this.state.user.contactNo}</h3><br/>
                <h3 className="card-text">Notification Mode: {this.state.user.mode.toUpperCase()}</h3><br/>
                <h3 className="card-text">Products Count: {this.state.user.Cart.length}</h3><br/>

            </div>
            </div>
            </div>
        ): (<div>
            <h1>Loading</h1>
        </div>)
    }
}
