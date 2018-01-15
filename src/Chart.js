import React, { Component } from 'react';
import * as d3 from 'd3';
import './Chart.css';

function getBarPath(height, xScale, yScale, d) {
  const x = xScale(d.year);
  const w = xScale.bandwidth();
  const y = yScale(d.value);
  const h = height - yScale(d.value);
  const r = 3;
  return `M${x + r},${y} A${r},${r} 0 0,0 ${x},${y + r} L${x},${y + h} L${x + w},${y + h} L${x + w},${y + r} A${r},${r} 0 0,0 ${x + w - r},${y} Z`;
}

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.div = null;
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
    const margin = { top: 80, right: 80, bottom: 80, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
        
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
        
    // create left yAxis
    const yAxis = d3
      .axisLeft()
      .scale(y)
      .ticks(this.getYTicks())
      .tickSize(0);
      
    // create yAxis grid
    const yAxisGrid = d3
      .axisLeft()
      .scale(y)
      .ticks(this.getYTicks())
      .tickSize(-width);
    
    const svg = d3.select(this.div).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("class", "chart")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    const data = this.getData();
    x.domain(data.map((d) => d.year));
    
    // add the Y gridlines
    svg.append("g")			
      .attr("class", "chart__y-axis__grid")
      .call(yAxisGrid);

    svg.selectAll(".chart__y-axis__grid text")
      .attr('x', '-0.5em');

    svg.append("g")
      .attr("class", "chart__x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    
    svg.selectAll(".chart__x-axis text")
      .attr('dy', '1.5em');
      
    const bars = svg.selectAll(".bar").data(data).enter();
    bars.append("path")
      .attr("class", "chart__bar")
      .attr("d", (d) => getBarPath(height, x, y, d));
  }
  render() {
    return (
      <div ref={(ref) => { this.div = ref; }} />
    );
  }
};