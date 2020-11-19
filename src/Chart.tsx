import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ScaleBand, ScaleLinear } from 'd3';

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

export function Chart({ yDomain = [0, 100], yTicks = 8, data }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!divRef.current || !canvasRef.current) {
      return;
    }

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

    // Create yAxis grid
    const yAxis = d3.axisLeft(y).ticks(yTicks).tickSize(-width);

    // Remove any previous chart SVG
    d3.select(divRef.current).selectAll('*').remove();

    // Create a new chart SVG
    const svg = d3
      .select(divRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg
      .append('g')
      .attr('class', 'chart__group')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    x.domain(data.map((d) => d.year));

    g.append('rect')
      .attr('class', 'chart__fill')
      .attr('x', -margin.left)
      .attr('y', -margin.top)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('fill', 'rgba(0, 0, 0, 0)');

    // add the Y gridlines, remove top grid line
    g.append('g')
      .attr('class', 'chart__y-axis')
      .call(yAxis)
      .selectAll('.tick:last-child')
      .remove();

    g.selectAll('.chart__y-axis text')
      .attr('x', '-24')
      .attr('y', '14')
      .attr('dy', '0')
      .attr('font-size', style.labels.size)
      .attr('text-anchor', 'end')
      .attr('fill', style.labels.color);

    g.selectAll('.chart__y-axis .domain').remove();

    g.selectAll('.chart__y-axis line')
      .attr('stroke', style.grid.color)
      .attr('stroke-width', style.grid.width);

    const bars = g.selectAll('.bar').data(data).enter();
    bars
      .append('path')
      .attr('class', 'chart__bar')
      .attr('fill', style.bar.color)
      .attr('d', (d) => getBarPath(height, x, y, d));

    g.append('g')
      .attr('class', 'chart__x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    g.selectAll('.chart__x-axis .domain').remove();

    g.selectAll('.chart__x-axis line').remove();
    g.selectAll('.chart__x-axis text')
      .attr('x', '0')
      .attr('y', '96')
      .attr('dx', '0')
      .attr('dy', '0')
      .attr('text-anchor', 'middle')
      .attr('font-size', style.labels.size * (data.length > 8 ? 1.0 : 1.5))
      .attr('font-weight', 'bold')
      .attr('fill', style.labels.color);

    g.selectAll('.chart__x-axis')
      .append('line')
      .attr('class', 'chart__origin')
      .attr('x1', 0)
      .attr('y1', 0.5)
      .attr('x2', width)
      .attr('y2', 0.5)
      .attr('stroke', style.origin.color)
      .attr('stroke-width', style.origin.width);

    const xms = new XMLSerializer();
    const svgString = xms.serializeToString(svg.node()!);
    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });

    const context = canvasRef.current.getContext('2d');
    const svgURL = URL.createObjectURL(svgBlob);
    const img = new Image();

    if (context) {
      // Erase the canvas before drawing the SVG. React does not re-render the
      // canvas so we need to clear before drawing.
      context.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      img.onload = () => {
        context.drawImage(img, 0, 0);
        URL.revokeObjectURL(svgURL);
        // const pngURL = this.canvas.toDataURL();
      };
    }

    img.src = svgURL;
  }, [yDomain, yTicks, data, divRef, canvasRef]);

  return (
    <div className="chart">
      <div className="chart__div" ref={divRef} />
      <canvas
        className="chart__canvas"
        width={chartWidth}
        height={chartHeight}
        ref={canvasRef}
      />
    </div>
  );
}
