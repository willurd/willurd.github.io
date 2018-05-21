import React, { Component } from 'react';
import './App.css';
import Titlebar from './views/Titlebar';
import Header from './views/Header';
import About from './views/About';

class App extends Component {
  render() {
    return (
      <div className="chrome-container container-fluid">
        <Titlebar />
        <Header />
        <About />
      </div>
    );
  }
}

export default App;
