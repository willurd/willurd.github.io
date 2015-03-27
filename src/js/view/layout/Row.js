import React from 'react';

const Row = React.createClass({
  propTypes: {
    style: React.PropTypes.object
  },

  render() {
    return (
      <div className='row' style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
})

export default Row;
