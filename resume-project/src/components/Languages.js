import React, { Component } from 'react';

class Languages extends Component {
  render() {
    return (
      <div id="languages" className="row section">
        <div className="col-md-3 column heading-column">
          <h3>Programming Languages</h3>
        </div>

        <div className="col-md-9 column content-column">
          <ul className="taglist">
            <li>
              <span className="text">JavaScript</span>
              <span className="badge">13 years</span>
            </li>
            <li>
              <span className="text">HTML</span>
              <span className="badge">13</span>
            </li>
            <li>
              <span className="text">CSS</span>
              <span className="badge">13</span>
            </li>
            <li>
              <span className="text">Python</span>
              <span className="badge">6</span>
            </li>
            <li>
              <span className="text">ActionScript 3</span>
              <span className="badge">6</span>
            </li>
            <li>
              <span className="text">MXML</span>
              <span className="badge">6</span>
            </li>
            <li>
              <span className="text">Ruby</span>
              <span className="badge">6</span>
            </li>
            <li>
              <span className="text">Java</span>
              <span className="badge">4</span>
            </li>
            <li>
              <span className="text">Lua</span>
              <span className="badge">4</span>
            </li>
            <li>
              <span className="text">C++</span>
              <span className="badge">2</span>
            </li>
            <li>
              <span className="text">Common Lisp</span>
              <span className="badge">2</span>
            </li>
            <li>
              <span className="text">PHP</span>
              <span className="badge">2</span>
            </li>
            <li>
              <span className="text">C</span>
              <span className="badge">1</span>
            </li>
            <li>
              <span className="text">CoffeeScript</span>
              <span className="badge">1</span>
            </li>
            <li>
              <span className="text">Objective-C</span>
              <span className="badge">1</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Languages;
