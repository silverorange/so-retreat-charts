import React from 'react';
import { Chart } from './Chart';
import data from './data';

import './App.css';

const dataSet = 'pullRequests';

export function App() {
  return (
    <div className="App">
      <Chart
        yTicks={data[dataSet].ticks}
        yDomain={data[dataSet].domain}
        data={data[dataSet].data}
      />
    </div>
  );
}
