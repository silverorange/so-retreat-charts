import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './Chart.css';

const chartWidth = 3840;
const chartHeight = 1960;

const style = {
  bar: {
    color: '#1b8bcd',
    radius: 0,
  },
  grid: {
    color: 'rgba(20, 104, 154, 0.4)',
    width: 2,
  },
  origin: {
    color: 'rgba(20, 104, 154, 0.7)',
    width: 2,
  },
  labels: {
    size: 48,
    color: '#1b243b',
  },
};

function getBarPath(height, xScale, yScale, d) {
  const x = xScale(d.year);
  const w = xScale.bandwidth();
  const y = yScale(d.value);
  const h = height - yScale(d.value);
  const r = style.bar.radius;
  return `M${x + r},${y} A${r},${r} 0 0,0 ${x},${y + r} L${x},${y + h} L${
    x + w
  },${y + h} L${x + w},${y + r} A${r},${r} 0 0,0 ${x + w - r},${y} Z`;
}

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.div = null;
    this.canvas = null;
  }

  componentDidMount() {
    const margin = { top: 20, right: 0, bottom: 120, left: 200 };
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.4)
      .paddingOuter(0.8);

    const y = d3
      .scaleLinear()
      .domain(this.props.yDomain)
      .rangeRound([height, 0]);

    const xAxis = d3.axisBottom().scale(x).tickSize(0);

    // create yAxis grid
    const yAxis = d3
      .axisLeft()
      .scale(y)
      .ticks(this.props.yTicks)
      .tickSize(-width);

    const svg = d3
      .select(this.div)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const { data } = this.props;
    x.domain(data.map((d) => d.year));

    svg
      .append('rect')
      .attr('class', 'chart__fill')
      .attr('x', -margin.left)
      .attr('y', -margin.top)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('fill', 'rgba(0, 0, 0, 0)');

    // add the Y gridlines, remove top grid line
    svg
      .append('g')
      .attr('class', 'chart__y-axis')
      .call(yAxis)
      .selectAll('.tick:last-child')
      .remove();

    svg
      .selectAll('.chart__y-axis text')
      .attr('x', '-24')
      .attr('y', '14')
      .attr('dy', '0')
      .attr('font-size', style.labels.size)
      .attr('text-anchor', 'end')
      .attr('fill', style.labels.color);

    svg.selectAll('.chart__y-axis .domain').remove();

    svg
      .selectAll('.chart__y-axis line')
      .attr('stroke', style.grid.color)
      .attr('stroke-width', style.grid.width);

    const bars = svg.selectAll('.bar').data(data).enter();
    bars
      .append('path')
      .attr('class', 'chart__bar')
      .attr('fill', style.bar.color)
      .attr('d', (d) => getBarPath(height, x, y, d));

    svg
      .append('g')
      .attr('class', 'chart__x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.selectAll('.chart__x-axis .domain').remove();

    svg.selectAll('.chart__x-axis line').remove();
    svg
      .selectAll('.chart__x-axis text')
      .attr('x', '0')
      .attr('y', '96')
      .attr('dx', '0')
      .attr('dy', '0')
      .attr('text-anchor', 'middle')
      .attr('font-size', style.labels.size * (data.length > 8 ? 1.0 : 1.5))
      .attr('font-weight', 'bold')
      .attr('fill', style.labels.color);

    svg
      .selectAll('.chart__x-axis')
      .append('line')
      .attr('class', 'chart__origin')
      .attr('x1', 0)
      .attr('y1', 0.5)
      .attr('x2', width)
      .attr('y2', 0.5)
      .attr('stroke', style.origin.color)
      .attr('stroke-width', style.origin.width);

    this.svgToPng();
  }
  svgToPng() {
    const xms = new XMLSerializer();
    const svgString = xms.serializeToString(
      this.div.getElementsByTagName('svg')[0]
    );
    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const context = this.canvas.getContext('2d');
    const svgURL = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      context.drawImage(img, 0, 0);
      URL.revokeObjectURL(svgURL);
      // const pngURL = this.canvas.toDataURL();
    };

    img.src = svgURL;
  }
  render() {
    return (
      <div>
        <div
          ref={(ref) => {
            this.div = ref;
          }}
        />
        <canvas
          width={chartWidth}
          height={chartHeight}
          ref={(ref) => {
            this.canvas = ref;
          }}
        />
      </div>
    );
  }
}

Chart.defaultProps = {
  yTicks: 8,
  yDomain: [0, 100],
  data: [],
};

Chart.propTypes = {
  yTicks: PropTypes.number,
  yDomain: PropTypes.arrayOf(PropTypes.number),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
};
