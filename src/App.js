import React from 'react';
import Chart from './Chart';

import './App.css';

const pullRequests = [
  {
    year: 2014,
    value: 2029
  },
  {
    year: 2015,
    value: 2209
  },
  {
    year: 2016,
    value: 2418
  },
  {
    year: 2017,
    value: 3375
  }
];

const siteReleases = [
  {
    year: 2015,
    value: 244
  },
  {
    year: 2016,
    value: 516
  },
  {
    year: 2017,
    value: 753
  }
];

const repositories = [
  {
    year: 2015,
    value: 70
  },
  {
    year: 2016,
    value: 103
  },
  {
    year: 2017,
    value: 128
  }
];

const iOSReleases = [
  {
    year: 2014,
    value: 3
  },
  {
    year: 2015,
    value: 23
  },
  {
    year: 2016,
    value: 19
  },
  {
    year: 2017,
    value: 7
  }
];

const androidReleases = [
  {
    year: 2015,
    value: 25
  },
  {
    year: 2016,
    value: 16
  },
  {
    year: 2017,
    value: 7
  }
];

export default function App() {
  return (
    <div className="App">
      <Chart yTicks={8} yDomain={[0, 3500]} data={pullRequests} />
      <Chart yTicks={7} yDomain={[0, 800]} data={siteReleases} />
      <Chart yTicks={7} yDomain={[0, 140]} data={repositories} />
      <Chart yTicks={5} yDomain={[0, 30]} data={iOSReleases} />
      <Chart yTicks={5} yDomain={[0, 30]} data={androidReleases} />
    </div>
  );
}
