import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PullRequestChart from './PullRequestChart';
import SiteReleasesChart from './SiteReleasesChart';
import RepositoriesChart from './RepositoriesChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PullRequestChart />
        <SiteReleasesChart />
        <RepositoriesChart />
      </div>
    );
  }
}

export default App;
