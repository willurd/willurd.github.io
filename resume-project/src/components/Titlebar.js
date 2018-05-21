import React, { Component } from 'react';
import ExternalLink from './lib/ExternalLink';

class Titlebar extends Component {
  render() {
    const email = 'william.bowers@gmail.com';

    return (
      <div className="title-bar row smaller">
        <div className="float-right">
          <a className="nostyle" href={`mailto:${email}`}>{email}</a>
        </div>

        <div>
          <ExternalLink href="http://www.linkedin.com/in/wbowers" label="LinkedIn" />
          &nbsp;&nbsp;·&nbsp;&nbsp;
          <ExternalLink href="https://github.com/willurd" label="GitHub" />
        </div>
      </div>
    );
  }
}

export default Titlebar;
