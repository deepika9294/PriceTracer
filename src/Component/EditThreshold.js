import axios from 'axios';
import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import {BACKEND} from '../config';

class EditThreshold extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            thresholdPrice : "",
            variant : "",
            msg : "",
        }
    }

    onChangethresholdPrice = (e) =>{
        this.setState({
            thresholdPrice : e.target.value,
        })    
    }

    onSubmit = async (e) =>{
        e.preventDefault();
        const { id } = this.props.match.params;
        const user = {
            uid : localStorage.getItem('id'),
            pid : id,
            newThreshold : this.state.thresholdPrice,
        }
        const res_data = await axios
        .post(BACKEND + '/products/editThreshold',  user)
        .then(res => res.data)
        .catch(err => console.log(err));

        console.log(res_data);

        if(res_data.success === true){
            console.log("here i am");
            this.props.history.push(`/home`);
        }
        else{
            this.setState({
                variant : "danger",
                msg : res_data.msg,
            })
        }
    }

    onClose = (e) =>{
        this.setState({
            msg : "",
        });
    }


    render(){
        return (
            <div className="container">
            <div style={{width: '80%', margin : '10px auto'}}>
                  
                <form onSubmit={this.onSubmit}>
                    { this.state.msg? <Alert style={{width : '50%'}} variant={this.state.variant} onClose={this.onClose} dismissible>
                                            <p>{this.state.msg.toUpperCase()}</p>
                                        </Alert> : "" }
                    {/* <h2 style={{color : 'red'}}><u>Add Product</u></h2><br/> */}
                
                    <div className={"form-group"}>
                        <label style={{fontSize : '20px', color: 'white'}} htmlFor="producturl">Product URL</label>
                        <input style={{ width: '90%', height : '40px'}}
                            id="producturl" 
                            type="text"
                            name="productURL" 
                            placeholder={this.props.location.state.productURL} 
                            disabled
                        />
                    </div>
                    <div  className={"form-group"}>
                        <label style={{fontSize: '20px', color: 'white'}}  htmlFor="price">New Threshold Price</label>
                        <input style={{ width: '90%', height : '40px'}} 
                            id="price" 
                            type="number" 
                            min="0"
                            name="thresholdPrice"
                            placeholder={this.props.location.state.thresholdPrice} 
                            value={this.state.thresholdPrice} 
                            onChange={this.onChangethresholdPrice}
                            required
                        />
                    </div><br/>
                    <button type="submit" style={{width: '95%', margin:"2px auto 6px"}} className={'btn btn-primary btn-block'}>Update Threshold Price</button>
                </form>
           
            </div>
            
        </div>
        )
    }
}

export default EditThreshold;