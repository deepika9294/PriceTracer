import React, { Component } from 'react'
import {Button} from "reactstrap"



export class Land extends Component {

    mail = () => {
        window.open('mailto:pricetracer1.0@gmail.com?subject=Subject&body=Body%20goes%20here');
    }

    render() {
        return (
            <div>
                <h2 className="intro1">Welcome to <br></br> Price Tracer !!</h2>
                <h2 className="intro">Track Prices of Your Favourite Products..</h2>
                <Button onClick={this.mail}>Contact Us</Button>
            </div>
        )
    }
}

export default Land
