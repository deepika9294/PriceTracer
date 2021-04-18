import React, { Component } from 'react'

export class About extends Component {
    render() {
        return (
            <div style={{marginTop : '200px', color : 'black', backgroundColor : 'whitesmoke'}}className="container">
                <h1>About The Website</h1>

                <p style={{fontSize : '20px'}}> 
                    This webiste - <u>Price Tracer</u> helps users by notifying them
                    by Email (given by thne at the time of Registration) of fall in
                    price of a product that they have registered for tracking.
                    <hr/>
                    <b>This happens in three simple steps -</b>
                    <ul>
                        <li> Users have to register to site with valid Email ID</li>
                        <li> Then they have to mention the url of the product to be price tracked from E-commerce websites
                             and enter the thresholdprice for the same.
                        </li>
                        <li> On price drop down the user gets notified about the same via an email through email id registered</li>
                    </ul>
                    <hr/>
                    <b>Additional features - </b>
                    <br/>
                    The users can also review the on demand graphical analysis of the price trends of the products that are currently being tracked
                    by them and in addition to that the can also be recommended the same product from various e-commerece webistes.
                    <hr/>
                    <p>
                        <b>List of Websites suppoorted -</b>
                        <ul>
                            <li>Flipkart</li>
                            <li>Amazon</li>
                            <li>Myntra</li>
                        </ul>
                    </p>
                    <hr/>
                    <footer> 
                        Price Tracer - 2021
                    </footer>
                </p>
            </div>
        )
    }
}

export default About;
