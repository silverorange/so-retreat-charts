import React, { Component } from 'react';
import Chart from './Chart';

export default class RepositoriesChart extends Chart {
  getData() {
    return [
      {
        year: 2016,
        value: 70,
      },
      {
        year: 2017,
        value: 103,
      },
      {
        year: 2018,
        value: 128,
      },
    ];
  }
  getYDomain() {
    return [0, 140];
  }
  getYTicks() {
    return 7;
  }
};