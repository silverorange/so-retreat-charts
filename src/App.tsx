import React from 'react';
import { Chart } from './Chart';
import * as data from './data';

import './App.css';

const dataSet = 'showAndTells';

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
