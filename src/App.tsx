import React, { Fragment } from 'react';
import { Chart } from './Chart';
import * as data from './data';

import './App.css';

const myData = {
  showAndTellsByMonth: data.showAndTellsByMonth,
  platformsByYear: data.platformsByYear,
  languagesByYear: data.languagesByYear,
  showAndTells: data.showAndTells,
  androidReleases: data.androidReleases,
  iOSReleases: data.iOSReleases,
  pullRequests: data.pullRequests,
  siteReleases: data.siteReleases,
  repositories: data.repositories,
};

type DataKeysType = keyof typeof myData;

export function App() {
  return (
    <div className="App">
      {(Object.keys(myData) as DataKeysType[]).map((dataSet) => {
        return (
          <Fragment key={dataSet}>
            <h1 className="app__data-set">{dataSet}</h1>
            <Chart
              yTicks={data[dataSet].ticks}
              yDomain={data[dataSet].domain}
              series={data[dataSet].series}
              columns={data[dataSet].columns}
              data={data[dataSet].data}
              name={dataSet}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
