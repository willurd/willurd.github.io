import React, { Component } from 'react';

class Skills extends Component {
  render() {
    return (
      <div id="skills" className="row section scrollspy">
        <div className="col-md-3 column heading-column">
          <h3>Skills</h3>
        </div>

        <div className="col-md-9 column content-column">
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
            <li>
              <span className="text">Source Control</span>
              <span className="badge">git / svn / cvs</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Skills;
