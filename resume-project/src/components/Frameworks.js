import React, { Component } from 'react';

class Frameworks extends Component {
  render() {
    return (
      <div id="frameworks" className="row section">
        <div className="column heading-column">
          <h3>Frameworks, libraries, etc</h3>
        </div>

        <div className="column content-column">
          <ul className="taglist">
            <li>
              <span className="text">React</span>
            </li>
            <li>
              <span className="text">Flux</span>
            </li>
            <li>
              <span className="text">Underscore.js</span>
            </li>
            <li>
              <span className="text">Bootstrap</span>
            </li>
            <li>
              <span className="text">Flex</span>
            </li>
            <li>
              <span className="text">Node.js</span>
            </li>
            <li>
              <span className="text">Photoshop</span>
            </li>
            <li>
              <span className="text">Django</span>
            </li>
            <li>
              <span className="text">NoSQL Databases</span>
            </li>
            <li>
              <span className="text">Relational Databases</span>
            </li>
            <li>
              <span className="text">jQuery</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Frameworks;
