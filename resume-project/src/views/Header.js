import React, { Component } from 'react';
import meImage from '../img/me.jpg';
import trailImage from '../img/trail.jpg';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-image-container">
          <img src={trailImage} />
        </div>

        <div className="header-content">
          <h1>Will Bowers</h1>
          <h4>Software Engineer | Frontend</h4>

          <div className="col-md-12 column heading-column content-column">
            <div className="me">
              <img src={meImage} width="150" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
