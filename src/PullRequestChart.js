import React, { Component } from 'react';
import Chart from './Chart';

export default class PullRequestChart extends Chart {
  getData() {
    return [
      {
        year: 2016,
        value: 2211,
      },
      {
        year: 2017,
        value: 2418,
      },
      {
        year: 2018,
        value: 3365,
      },
    ];
  }
  getYDomain() {
    return [0, 3500];
  }
  getYTicks() {
    return 8;
  }
};