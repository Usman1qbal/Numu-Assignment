import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    let width = 100*this.props.graphData.length;
    if(width<700 || width  > 700)
    {
      width=700
    }
    if(this.props.width){ width = this.props.width}
    return (
      <LineChart
        width={width}
        height={400}
        data={this.props.graphData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {this.props.graph1 ? <Line type="monotone" dataKey={this.props.graph1} stroke="#8884d8" activeDot={{ r: 8 }} />
        :<Line type="monotone" dataKey={this.props.graph2} stroke="#82ca9d" activeDot={{ r: 8 }}/>}
      </LineChart>
    );
  }
}
