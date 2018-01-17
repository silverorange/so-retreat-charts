import React, { Component } from 'react';
import * as d3 from 'd3';
import './Chart.css';

const style = {
  bar: {
    color: '#d7e6a3',
    radius: 6,
  },
  grid: {
    color: 'rgba(11, 99, 116, 0.5)',
    width: 2,
  },
  origin: {
    color: 'rgba(11, 99, 116, 1)',
    width: 2,
  },
  labels: {
    size: 24,
    color: '#fff',
  },
};

function getBarPath(height, xScale, yScale, d) {
  const x = xScale(d.year);
  const w = xScale.bandwidth();
  const y = yScale(d.value);
  const h = height - yScale(d.value);
  const r = style.bar.radius;
  return `M${x + r},${y} A${r},${r} 0 0,0 ${x},${y + r} L${x},${y + h} L${x + w},${y + h} L${x + w},${y + r} A${r},${r} 0 0,0 ${x + w - r},${y} Z`;
}

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.div = null;
    this.textarea = null;
  }
  getData() {
    return [];
  }
  getYDomain() {
    return [0, 100];
  }
  getYTicks() {
    return 8;
  }
  componentDidMount() {
    const margin = { top: 20, right: 0, bottom: 60, left: 100 };
    const width = 1240 - margin.left - margin.right;
    const height = 1096 - margin.top - margin.bottom;
        
    const x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.3);

    const y = d3.scaleLinear()
      .domain(this.getYDomain())
      .rangeRound([height, 0]);

    const xAxis = d3.axisBottom()
      .scale(x)
      .tickSize(0);

    // create yAxis grid
    const yAxis = d3
      .axisLeft()
      .scale(y)
      .ticks(this.getYTicks())
      .tickSize(-width);

    const svg = d3.select(this.div).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const data = this.getData();
    x.domain(data.map((d) => d.year));

    svg.append('rect')
      .attr('class', 'chart__fill')
      .attr('x', -margin.left)
      .attr('y', -margin.top)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('fill', 'rgba(0, 0, 0, 0)');

    // add the Y gridlines
    svg.append('g')
      .attr('class', 'chart__y-axis')
      .call(yAxis);

    svg.selectAll('.chart__y-axis text')
      .attr('x', '-12')
      .attr('y', '7')
      .attr('dy', '0')
      .attr('font-size', style.labels.size)
      .attr('text-anchor', 'end')
      .attr('fill', style.labels.color);

    svg.selectAll('.chart__y-axis .domain')
      .remove();

    svg.selectAll('.chart__y-axis line')
      .attr('stroke', style.grid.color)
      .attr('stroke-width', style.grid.width);

    const bars = svg.selectAll('.bar').data(data).enter();
    bars.append('path')
      .attr('class', 'chart__bar')
      .attr('fill', style.bar.color)
      .attr('d', (d) => getBarPath(height, x, y, d));

    svg.append('g')
      .attr('class', 'chart__x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    svg.selectAll('.chart__x-axis .domain')
      .remove();

    svg.selectAll('.chart__x-axis line').remove();
    svg.selectAll('.chart__x-axis text')
      .attr('x', '0')
      .attr('y', '36')
      .attr('dx', '0')
      .attr('dy', '0')
      .attr('text-anchor', 'middle')
      .attr('font-size', style.labels.size)
      .attr('fill', style.labels.color);

    svg.selectAll('.chart__x-axis').append('line')
      .attr('class', 'chart__origin')
      .attr('x1', 0)
      .attr('y1', 0.5)
      .attr('x2', width)
      .attr('y2', 0.5)
      .attr('stroke', style.origin.color)
      .attr('stroke-width', style.origin.width);

    const xms = new XMLSerializer();
    this.textarea.value = xms.serializeToString(this.div.getElementsByTagName('svg')[0]);
  }
  render() {
    return (
      <div>
        <div ref={(ref) => { this.div = ref; }} />
        <textarea rows={15} ref={(ref) => { this.textarea = ref; }} className="chart__content" />
      </div>
    );
  }
};