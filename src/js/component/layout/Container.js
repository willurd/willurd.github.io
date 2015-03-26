var React = require('react');

var Container = React.createClass({
  propTypes: {
    style: React.PropTypes.object
  },

  render() {
    return (
      <div className='container' style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Container;
