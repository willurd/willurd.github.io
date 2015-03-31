import React from 'react';
import TRIM from 'lib/TRIM';

const NotFound = React.createClass({
  getInitialState() {
    return {
      message: TRIM`
        Whoops, it looks like this page doesn't exist. Try
        <a href="/">going home</a>.
      `
    };
  },

  render() {
    return (
      <div>
        <p className='lead' dangerouslySetInnerHTML={{__html: this.state.message}}></p>
      </div>
    );
  }
});

export default NotFound;
