import React, { Component } from "react";

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
              <span className="text">GraphQL</span>
            </li>
            <li>
              <span className="text">Redux</span>
            </li>
            <li>
              <span className="text">Node.js</span>
            </li>
            <li>
              <span className="text">git</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Frameworks;
