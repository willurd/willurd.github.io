import React, { Component } from 'react';

class Skills extends Component {
  render() {
    return (
      <div id="skills" className="row section">
        <div className="column heading-column">
          <h3>Skills</h3>
        </div>

        <div className="column content-column">
          <ul className="taglist">
            <li>
              <span className="text">UI / Web Design</span>
            </li>
            <li>
              <span className="text">UI / Application Development</span>
            </li>
            <li>
              <span className="text">Backend Development</span>
            </li>
            <li>
              <span className="text">Usability</span>
            </li>
            <li>
              <span className="text">Interaction Design</span>
            </li>
            <li>
              <span className="text">Technical Leadership</span>
            </li>
            <li>
              <span className="text">Problem Solving</span>
            </li>
            <li>
              <span className="text">Unit Testing</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Skills;
