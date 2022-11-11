import React, { Component } from "react";
import meImage from "../img/me.jpg";
import trailImage from "../img/trail.jpg";

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-image-container">
          <img alt="a hiking trail" src={trailImage} />
        </div>

        <div className="header-content">
          <h1>Will Bowers</h1>
          <h4>Senior Software Engineer | Frontend</h4>

          <div className="column heading-column content-column">
            <div className="me">
              <img alt="Will Bowers" src={meImage} width="150" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
