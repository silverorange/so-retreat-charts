import React, { Fragment } from 'react';
import { Chart } from './Chart';
import * as data from './data';

import './App.css';

type DataKeysType = keyof typeof data;

export function App() {
  return (
    <div className="App">
      {(Object.keys(data) as DataKeysType[]).map((dataSet) => {
        return (
          <Fragment key={dataSet}>
            <h1 className="app__data-set">{dataSet}</h1>
            <Chart
              yTicks={data[dataSet].ticks}
              yDomain={data[dataSet].domain}
              data={data[dataSet].data}
              name={dataSet}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
