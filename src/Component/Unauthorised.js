import React, { Component } from 'react'
import { Link} from "react-router-dom";

export default class Unauthorised extends Component {
    render() {
        return (
            <div>
                <div className="bg-dark text-white py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-2 text-center">
                                <p><i className="fa fa-exclamation-triangle fa-5x"></i><br/>Status Code: 403</p>
                        </div>
                        <div className="col-md-10">
                                <h3>OPPSSS!!!! Sorry...</h3>
                                <p>Sorry, your access is refused due to security reasons of our server and also our sensitive data.<br/>Please go back to the previous page to continue browsing.</p>
                            
                                <Link id="btn-linkl"  to="/">
                                    <span>Landing Page</span>
                                 </Link>
                        </div>
                    </div>
                </div>

                <div id="footer" className="text-center">
                    @Price Tracer
                </div>
            </div>

            </div>
        )
    }
}
