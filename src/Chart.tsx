import React, { Component } from 'react';
import * as d3 from 'd3';

import './Chart.css';
import { ScaleBand, ScaleLinear } from 'd3';

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

interface Datum {
  year: string;
  value: number;
}

interface Props {
  yTicks?: number;
  yDomain?: number[];
  data: Datum[];
}

function getBarPath(
  height: number,
  xScale: ScaleBand<Datum['year']>,
  yScale: ScaleLinear<number, number, never>,
  d: Datum
): string {
  const x = xScale(d.year) || 0;
  const w = xScale.bandwidth();
  const y = yScale(d.value);
  const h = height - yScale(d.value);
  const r = style.bar.radius;
  return `M${x + r},${y} A${r},${r} 0 0,0 ${x},${y + r} L${x},${y + h} L${
    x + w
  },${y + h} L${x + w},${y + r} A${r},${r} 0 0,0 ${x + w - r},${y} Z`;
}

export class Chart extends Component<Props> {
  private div: HTMLDivElement | null;
  private canvas: HTMLCanvasElement | null;

  constructor(props: Props) {
    super(props);
    this.div = null;
    this.canvas = null;
  }

  public componentDidMount() {
    const { yDomain = [0, 100], yTicks = 8, data } = this.props;

    const margin = { top: 20, right: 0, bottom: 120, left: 200 };
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;

    const x = d3
      .scaleBand<Datum['year']>()
      .rangeRound([0, width])
      .paddingInner(0.4)
      .paddingOuter(0.8);

    const y = d3.scaleLinear().domain(yDomain).rangeRound([height, 0]);

    const xAxis = d3.axisBottom(x).tickSize(0);

    // create yAxis grid
    const yAxis = d3.axisLeft(y).ticks(yTicks).tickSize(-width);

    const svg = d3
      .select(this.div)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('class', 'chart')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

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

  public svgToPng() {
    if (this.div && this.canvas) {
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

      if (context) {
        img.onload = () => {
          context.drawImage(img, 0, 0);
          URL.revokeObjectURL(svgURL);
          // const pngURL = this.canvas.toDataURL();
        };
      }

      img.src = svgURL;
    }
  }

  public render() {
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
