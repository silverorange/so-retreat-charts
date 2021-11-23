import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ScaleBand, ScaleLinear } from 'd3';

import './Chart.css';

const chartWidth = 3840;
const chartHeight = 1960;

const style = {
  bar: {
    // 39b8e3
    //hsl(195, 85%, 62%, 0.6)
    color: 'rgba(255,255,255,0.6)',
    radius: 0,
  },
  grid: {
    color: 'rgba(255,255,255,0.4)',
    width: 2,
  },
  origin: {
    color: 'rgba(255,255,255,0.6)',
    width: 4,
  },
  labels: {
    size: 52,
    color: '#fff',
    fontFamily: 'Ubuntu, serif',
    fontWeight: 'bold',
  },
  dataLabels: {
    size: 52,
    color: '#573f68',
    fontFamily: 'Ubuntu, serif',
    fontWeight: 'medium',
  },
  dataLabelBackgrounds: {
    fill: '#fff',
    stroke: 'rgba(0,0,0,0.2)',
    strokeWidth: 4,
    radius: 5,
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
  name: string;
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

function getMask(
  parent: d3.Selection<d3.BaseType, any, any, any>,
  id: string,
  width: number,
  height: number,
  margin: { top: number; right: number; bottom: number; left: number },
  xScale: ScaleBand<Datum['year']>,
  yScale: ScaleLinear<number, number, never>,
  data: Datum[]
): d3.Selection<SVGMaskElement, any, any, any> {
  const mask = parent
    .append('mask')
    .attr('id', id)
    .attr('maskUnits', 'userSpaceOnUse');

  const [, , transform] = parent
    .attr('transform')
    .match(/^translate\(([0-9.-]+),\s*([0-9.-]+)\)$/) || [0, 0, 0];

  // Invert gridline transforms before applying mask
  const maskG = mask
    .append('g')
    .attr('transform', `translate(0,-${transform || 0})`);

  maskG
    .append('rect')
    .attr('fill', '#fff')
    .attr('x', -margin.left)
    .attr('y', -margin.top)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const maskBars = maskG.selectAll().data(data).enter();
  maskBars
    .append('path')
    .attr('class', 'chart__bar')
    .attr('fill', '#000')
    .attr('d', (d) => getBarPath(height, xScale, yScale, d));

  return mask;
}

export function Chart({ yDomain = [0, 100], yTicks = 8, data, name }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!divRef.current || !canvasRef.current) {
      return;
    }

    const maskId = `${name}Mask`;
    const margin = { top: 20, right: 0, bottom: 120, left: 200 };
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;
    const labelFontSize = style.labels.size * (data.length > 8 ? 1.0 : 1.5);
    const dataMagnitude = data.reduce<number>((previous, current) => {
      const magnitude = Math.floor(Math.log10(current.value)) + 1;
      return magnitude > previous ? magnitude : previous;
    }, 0);

    const dataLabelFontSize =
      style.dataLabels.size *
      (data.length > 8 || dataMagnitude > 3 ? 1.0 : 1.5);

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
      .attr('font-family', style.labels.fontFamily)
      .attr('text-anchor', 'end')
      .attr('fill', style.labels.color);

    g.selectAll('.chart__y-axis .domain').remove();

    // Update y-axis grid lines to use rects instead of lines and to be masked
    // by the chart bars.
    g.selectAll('.chart__y-axis .tick').each(function (datum, index) {
      const tick = d3.select(this);

      getMask(tick, `${maskId}${index}`, width, height, margin, x, y, data);

      // Remove lines.
      tick.selectAll('line').remove();

      // Replace lines with rects.
      tick
        .append('rect')
        .attr('x', 0)
        .attr('y', -style.grid.width / 2)
        .attr('width', width)
        .attr('height', style.grid.width)
        .attr('fill', style.grid.color)
        .attr('mask', `url(#${maskId}${index})`);
    });

    // Remove bottom grid line, but leave label in place.
    g.selectAll('.chart__y-axis .tick:first-child rect').remove();
    g.selectAll('.chart__y-axis .tick:first-child mask').remove();

    const bars = g.selectAll('.bar').data(data).enter();
    bars
      .append('path')
      .attr('class', 'chart__bar')
      .attr('fill', style.bar.color)
      .attr('d', (d) => getBarPath(height, x, y, d));

    function getTextWidth(d: Datum): number {
      const text = d.value.toString();

      const ones = text
        .split('')
        .reduce<number>(
          (previous, current) => previous + (current === '1' ? 1 : 0),
          0
        );

      const otherDigits = text.length - ones;
      const commas = Math.floor((text.length - 1) / 3);

      return (
        dataLabelFontSize * (ones * 0.5 + otherDigits * 0.6 + commas * 0.3 + 1)
      );
    }

    bars
      .append('rect')
      .attr('fill', style.dataLabelBackgrounds.fill)
      .attr('stroke', style.dataLabelBackgrounds.stroke)
      .attr('strokeWidth', style.dataLabelBackgrounds.strokeWidth)
      .attr('rx', style.dataLabelBackgrounds.radius)
      .attr('x', (d) => {
        return (x(d.year) || 0) + (x.bandwidth() - getTextWidth(d)) / 2;
      })
      .attr('y', (d) => {
        return y(d.value) - 0.9 * dataLabelFontSize;
      })
      .attr('width', getTextWidth)
      .attr('height', 1.8 * dataLabelFontSize)
      .attr('display', (d) => {
        return d.value === 0 ? 'none' : 'inherit';
      });

    g.selectAll('text.bar')
      .data(data)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', dataLabelFontSize)
      .attr('font-weight', style.dataLabels.fontWeight)
      .attr('font-family', style.dataLabels.fontFamily)
      .attr('fill', style.dataLabels.color)
      .attr('x', (d) => {
        return (x(d.year) || 0) + x.bandwidth() / 2;
      })
      .attr('y', (d) => {
        return y(d.value); // - style.dataLabels.size;
      })
      .text((d) => {
        return d.value.toLocaleString();
      })
      .attr('display', (d) => {
        return d.value === 0 ? 'none' : 'inherit';
      });

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
      .attr('font-size', labelFontSize)
      .attr('font-family', style.labels.fontFamily)
      .attr('font-weight', style.labels.fontWeight)
      .attr('fill', style.labels.color);

    const xAxisG = g.selectAll('.chart__x-axis');

    getMask(xAxisG, `${maskId}XAxis`, width, height, margin, x, y, data);

    xAxisG
      .append('rect')
      .attr('class', 'chart__origin')
      .attr('x', 0)
      .attr('y', -style.origin.width / 2)
      .attr('width', width)
      .attr('height', style.origin.width)
      .attr('fill', style.origin.color)
      .attr('mask', `url(#${maskId}XAxis)`);

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
  }, [yDomain, yTicks, data, divRef, canvasRef, name]);

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
