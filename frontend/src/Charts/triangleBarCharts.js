import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeCategory10).range();


const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default class BarCharts extends PureComponent {
  constructor(props){
    super(props);
  }
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/rnywhbu8/';

  render() {
    let data = this.props.graphData;
    let width = 100*this.props.graphData.length;
    if(width<700 || width  > 700)
    {
      width=700
    }
    return (
      <BarChart
      width={width}
      height={400}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="name" />
        <YAxis/>
        <Bar dataKey={this.props.graph2} fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))
          }
        </Bar>
      </BarChart>
    );
  }
}
