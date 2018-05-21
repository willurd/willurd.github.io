import React, { Component } from 'react';

class Titlebar extends Component {
  render() {
    const email = 'william.bowers@gmail.com';

    return (
      <div className="title-bar row smaller">
        <div className="float-right">
          <a className="nostyle" href={`mailto:${email}`}>{email}</a>
        </div>

        <div>
          <a target="_blank" rel="noopener noreferrer" href="http://www.linkedin.com/in/wbowers">LinkedIn</a>
          &bullet;
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/willurd">GitHub</a>
        </div>
      </div>
    );
  }
}

export default Titlebar;
