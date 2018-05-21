import React, { Component } from 'react';
import './App.css';
import Titlebar from './components/Titlebar';
import Header from './components/Header';
import About from './components/About';
import WorkHistory from './components/WorkHistory';
import Skills from './components/Skills';
import Languages from './components/Languages';
import Frameworks from './components/Frameworks';
import OpenSource from './components/OpenSource';

class App extends Component {
  render() {
    return (
      <div className="chrome-container container-fluid">
        <Titlebar />
        <Header />
        <About />
        <WorkHistory />
        <Skills />
        <Languages />
        <Frameworks />
        <OpenSource />
      </div>
    );
  }
}

export default App;
