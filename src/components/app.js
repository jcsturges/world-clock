import React, { Component } from 'react';

import ClockList from './clock_list';
import SearchBar from './search_bar';


export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="clearfix">
          <a href="https://github.com/jcsturges/world-clock" rel="noopener noreferrer" target="_blank" className="float-right">GitHub</a>
        </div>
        <h1>World Clock</h1>
        <SearchBar />
        <hr />
        <ClockList />
      </div>
    );
  }
}
