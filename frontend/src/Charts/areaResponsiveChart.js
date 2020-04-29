import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/7j5bbbum/';

  render() {
    let width = 100*this.props.graphData.length;
    if(width<700 || width  > 700)
    {
      width=700
    }
    if(this.props.width){ width = this.props.width}
    return (
      <div style={{ width: width, height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={this.props.graphData}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={this.props.graph2} stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
