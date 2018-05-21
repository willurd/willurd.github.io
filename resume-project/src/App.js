import React, { Component } from 'react';
import './App.css';
import Titlebar from './views/Titlebar';
import Header from './views/Header';

class App extends Component {
  render() {
    return (
      <div className="chrome-container container-fluid">
        <Titlebar />
        <Header />
      </div>
    );
  }
}

export default App;
