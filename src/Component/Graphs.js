import axios from "axios";
import React, {useEffect, useState} from "react";
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, Tooltip } from "recharts";
import { BACKEND } from "../config";
import moment from 'moment';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  background: "white",
  margin: "20px"
};

// var data = [];
// var count = 0;

function Graphs (props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetchData();
        return () => {
          console.log("Unmount");
        };
      }, []);
    

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
      }

      console.log("ss");
      
      console.log(data);
      
      //store the max height
    return isLoaded ? (
        <div className="container" style={styles}>
            <div className="row align-items-start">
                <div className="col">
                <h1>Bar Chart Visualisation</h1><br></br>
                    <BarChart width={500} height={350} data={data}>
                    <XAxis label="Timestamp in increasing order" dataKey="timestamp" tickFormatter={timeStr => moment(timeStr).format('D')}  tick={false} />
                    <YAxis dataKey="price" />
                    <Tooltip
                        wrapperStyle={{ backgroundColor: "red" }}
                        labelStyle={{ color: "green" }}
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


                <div className="col">
                <h1>Line Chart Visualisation</h1><br></br>
                    <LineChart width={500} height={350} data={data}>
                    <XAxis label="Timestamp in increasing order" dataKey="timestamp" tickFormatter={timeStr => moment(timeStr).format('D')}  tick={false} />
                    <YAxis dataKey="price" />
                    <Tooltip
                        wrapperStyle={{ backgroundColor: "red" }}
                        labelStyle={{ color: "green" }}
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
        <h1>Loading</h1>
        </>
    )
}
 

export default Graphs;