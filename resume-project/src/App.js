import React, { Component } from "react";
import "./App.css";
import About from "./components/About";
import Experience from "./components/Experience";
import Header from "./components/Header";
import Titlebar from "./components/Titlebar";
import WorkHistory from "./components/WorkHistory";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Titlebar />
        <Header />
        <About />
        <WorkHistory />
        <Experience />
      </div>
    );
  }
}

export default App;
