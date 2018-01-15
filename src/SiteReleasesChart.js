import React, { Component } from 'react';
import Chart from './Chart';

export default class SiteReleasesChart extends Chart {
  getData() {
    return [
      {
        year: 2016,
        value: 244,
      },
      {
        year: 2017,
        value: 516,
      },
      {
        year: 2018,
        value: 753,
      },
    ];
  }
  getYDomain() {
    return [0, 800];
  }
  getYTicks() {
    return 5;
  }
};