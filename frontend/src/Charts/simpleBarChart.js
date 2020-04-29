import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    let width = 100*this.props.graphData.length;
    if(width<700 || width  > 700)
    {
      width=700
    }
    if(this.props.width){ width = this.props.width}
    return (
      <BarChart
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
        {this.props.graph1 ? <Bar dataKey={this.props.graph1} fill="#8884d8" />
        :<Bar dataKey={this.props.graph2} fill="#82ca9d" />}
        
        
      </BarChart>
    );
  }
}
