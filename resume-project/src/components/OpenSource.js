import React, { Component } from 'react';
import Created from './opensource/Created';
import Contributions from './opensource/Contributions';

class OpenSource extends Component {
  render() {
    return (
      <div id="open-source" className="row section">
        <div className="column heading-column">
          <h3>Open Source</h3>
        </div>

        <div className="column content-column">
          <Created />
          <Contributions />
        </div>
      </div>
    );
  }
}

export default OpenSource;
