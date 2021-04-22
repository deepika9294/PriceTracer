import axios from "axios";
import React, {useEffect, useState} from "react";
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, Tooltip, ReferenceLine } from "recharts";
import { BACKEND } from "../config";
import moment from 'moment';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  background: "white",
  width:"70%",
};

// var data = [];
// var count = 0;

function Graphs (props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [threshold , setThreshold] = useState(0);
    
    useEffect(() => {

        const fetchData = async() => {
            await axios.get(`${BACKEND}/products/getproductdata/${props.id}`).then((res)=>{
                //  console.log(res.data.data);
                 const pData = res.data.data;
                 const tempData = [];
                
                pData.forEach((e,index)=> {
                    let p = {
                        // timestamp: index,
                        timestamp: e.timestamp,
                        price: e.price
                    }
                    tempData.push(p);
                });
                setData(tempData);
                setIsLoaded(true);
    
             }).catch((e) => console.log("erroe" + e));
    
             await axios.get(`${BACKEND}/products/getproduct/${props.id}`).then((res)=>{
                 console.log(res.data.thresholdPrice);
               
                setThreshold(res.data.thresholdPrice);
    
             }).catch((e) => console.log("erroe" + e));
    
          }

        fetchData();
        // return () => {
        //   console.log("Unmount");
        // };
      }, []);
    

      
      
      //store the max height
    return isLoaded ? (
        <div className="container" style={styles}>
            <div className="row align-items-start">
                <div className="graph">
                <h1>Bar Chart Visualisation</h1><br></br>
                    <BarChart width={500} height={350} data={data}>
                    <XAxis label="Timestamp in increasing order" dataKey="timestamp" tickFormatter={timeStr => moment(timeStr).format('D')}  tick={false} />
                    <YAxis dataKey="price" />

                    <Tooltip
                        wrapperStyle={{ backgroundColor: "red" }}
                        labelStyle={{ color: "#635bdf" }}
                        itemStyle={{ color: "cyan" }}
                        //price
                        formatter={function(value, name) {
                        return `${value}`;
                        }}
                        //timestamp
                        labelFormatter={function(value) {
                        return `Timestamp: ${value}`;
                        }}
                    />
                    <Bar dataKey="price" />
                    </BarChart>
                </div>


                <div className="graph">
                <h1>Line Chart Visualisation</h1><br></br>
                    <LineChart width={500} height={350} data={data}>
                    <XAxis label="Timestamp in increasing order" dataKey="timestamp" tickFormatter={timeStr => moment(timeStr).format('D')}  tick={false} />
                    <YAxis dataKey="price" />
                    <ReferenceLine y={threshold} label="Threshold" stroke="green" strokeDasharray="3 3" />

                    <Tooltip
                        wrapperStyle={{ backgroundColor: "red" }}
                        labelStyle={{ color: "#635bdf" }}
                        itemStyle={{ color: "cyan" }}
                        formatter={function(value, name) {
                        return `${value}`;
                        }}
                        labelFormatter={function(value) {
                        return `Timestamp: ${value}`;
                        }}
                    />
                    
                    <Line type="monotone" dataKey="price" stroke="#000000" strokeWidth={2} />
                    </LineChart>
                </div>
            </div>
      </div>
    ) : (
        <>
        Loading
        </>
    )
}
 

export default Graphs;